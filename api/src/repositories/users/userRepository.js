const UserModel = require('../../models/users/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Op} =require('sequelize');
const ProjetModel = require('../../models/projets/projetModel');
class UserRepository {
    static async createAccount(data) {
        try {
          const { email, password, country } = data;
      
          const username = await this.createUsernameFromEmail(email);
          const hashedPassword = await this.hashPassword(password);
      
          let isUnique = false;
          let referenceNumber;
      
          while (!isUnique) {
            referenceNumber = await this.generateNineUniqueNumber();
      
            const existing = await this.getByUniqueNumber(referenceNumber);
            isUnique = !existing;  
          }
      
          const newUser = await UserModel.create({
            username,
            referenceNumber,
            email,
            password: hashedPassword,
            country,
            userType: data.userType || 'User'
          });
      
          return newUser;
        } catch (error) {
          console.error("Error creating account:", error); // Log error for better context
          throw error;
        }
      }
      
      static async getByUniqueNumber(referenceNumber) {
        try {
          return await UserModel.findOne({ where: { referenceNumber } });
        } catch (error) {
          console.error("Error fetching user by reference number:", error);
          throw error;
        }
      }
      
      static async generateNineUniqueNumber() {
        // Ensure uniqueness by possibly maintaining a cache or database check
        return Math.floor(100000000 + Math.random() * 900000000).toString();
      }
      
  static async update(userId, data) {
    try {
      const user = await this.getById(userId);
      if (!user) {
        throw new Error('utilisateur non trouvé pour cet utilisateur');
      }

      await user.update(data);
      return user;
    } catch (error) {
      
      throw new Error(`Erreur lors de la mise à jour du user: ${error.message}`);
    }
  }

  
  static async getById(userId) {
    try {
      const user = await UserModel.findByPk(userId);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
static async getByEmail(email){
    try{
   const user=UserModel.findOne({where:{email}});
     return user;
    }catch(error){
        throw error;
    }
}
  
  static async createUsernameFromEmail(email) {
    try {
      
        let username = email.split('@')[0];
        let existingUser = await UserModel.findOne({ where: { username } });
        
        while (existingUser) {
          const randomNumber = Math.floor(Math.random() * 1000); 
          username = `${username}_${randomNumber}`; 
          existingUser = await UserModel.findOne({ where: { username } });
        }
  
        return username; 
      } catch (error) {
        throw error;
      }
  }
  


  static async hashPassword(password) {
    try {
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  
  static async comparePassword(password, hash) {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (error) {
      throw error;
    }
  }

  
  static async login(loginData) {
    try {
      const { username, password } = loginData;

    
      const user = await UserModel.findOne({ where: { username } });
      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }

     
      const isPasswordValid = await this.comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Email ou mot de passe incorrect');
      }
      const token = jwt.sign(
        { id: user.id},
        process.env.SECRET_KEY,
        { expiresIn:  process.env.LIFE_TIME } 
      );

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  // Récupérer tous les utilisateurs
  static async getAll() {
    try {
      const users = await UserModel.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async getUsersToDashboard() {
    try {
      // Récupérer tous les utilisateurs
      const allUsers = await UserModel.findAndCountAll();

      // Compter le nombre de Donors
      const allDonors = await UserModel.count({
        where: { userType: 'Donor' }
      });

      // Compter le nombre de Beneficiaries
      const allBeneficiaries = await UserModel.count({
        where: { userType: 'Beneficiary' }
      });

      // Récupérer le nombre d'utilisateurs créés ce mois-ci
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const usersThisMonth = await UserModel.count({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        }
      });

      // Calculer les pourcentages
      const totalUsers = allUsers.count;
      const statUserMonth = totalUsers > 0 ? (usersThisMonth / totalUsers) * 100 : 0;
      const statDonor = totalUsers > 0 ? (allDonors / totalUsers) * 100 : 0;
      const statBeneficiary = totalUsers > 0 ? (allBeneficiaries / totalUsers) * 100 : 0;

      // Retourner les données sous forme d'objet
      return {
        totalUsers,
        allDonors,
        allBeneficiaries,
        statUserMonth,
        statDonor:statDonor.toFixed(2),
        statBeneficiary:statBeneficiary.toFixed(2)
      };
    } catch (error) {
      throw error;
    }
  }
  static async getAdminStat() {
    try {
      // Total users
      const totalUsers = await UserModel.count();

      // Count users by type
      const donorsCount = await UserModel.count({ where: { userType: 'Donor' } });
      const beneficiariesCount = await UserModel.count({ where: { userType: 'Beneficiary' } });
      const obnlCount = await UserModel.count({ where: { userType: 'OBNL' } });

      // Calculate percentages
      const donorPercentage = (donorsCount / totalUsers) * 100;
      const beneficiaryPercentage = (beneficiariesCount / totalUsers) * 100;
      const obnlPercentage = (obnlCount / totalUsers) * 100;

      // Dates for the current month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Total projects and projects created this month
      const totalProjects = await ProjetModel.count();
      const monthlyProjectsCount = await ProjetModel.count({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });

      // Calculate project percentage for the current month
      const monthlyProjectPercentage = (monthlyProjectsCount / totalProjects) * 100;

      return {
        donorPercentage: donorPercentage.toFixed(2),
        beneficiaryPercentage: beneficiaryPercentage.toFixed(2),
        obnlPercentage: obnlPercentage.toFixed(2),
        monthlyProjectPercentage: monthlyProjectPercentage.toFixed(2),
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
