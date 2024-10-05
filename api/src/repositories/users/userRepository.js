const UserModel = require('../../models/users/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        { id: user.id,email:user.email, username: user.username, userType: user.userType },
        process.env.SECRET_KEY,
        { expiresIn: '1h' } 
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
}

module.exports = UserRepository;
