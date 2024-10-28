const UserRepository = require('../../repositories/users/userRepository');
const SessionRepository = require('../../repositories/users/sessionRepository');
const BeneficiaireReposistory = require('../../repositories/beneficiaires/beneficiaireRepository');
const ProjetRepository=require('../../repositories/projets/projetRepository');
class UserService{
    static async createAccount(data){
        try{
            const existingUser=await UserRepository.getByEmail(data.email);
            if(existingUser){
              throw new Error('user with this email is already set');  
            }
            return await UserRepository.createAccount(data);

        }catch(error){
            throw error;
        }
    }

    static async login(data){
        try{
            let {user,token}= await UserRepository.login(data);
            const sessionData={};
            sessionData.token=token;
            sessionData.userId=user.id;
           const session= await SessionRepository.createSession(sessionData);
           if(!session){
            throw new Error('An error occured');
           }
           const lifeTime=session.expireAt;
           user =await this.currentUser(user.id);
            return {user,token,lifeTime};
        }catch(error){
            throw error;
        }
    }
    static async getBeneficiaire(userId){
        try{
            return await BeneficiaireReposistory.getByUser(userId);
        }catch(error){
            throw error;
        }
    }
    static async getById(userId){
        try{
            return await UserRepository.getById(userId);
        }catch(error){
            throw error;
        }
    }
    static async currentUser(userId){
        try{
            return await UserRepository.getById(userId);
        }catch(error){
            throw error;
        }
    }
    static async update(userId,data){
        try{
            return await UserRepository.update(userId,data);
        }catch(error){
            throw error;
        }
    }
    static async getAll(){
        try{
            return await UserRepository.getAll();
        }catch(error){
            throw error;
        }
    }
    static async getNonValidUsers() {
        try {
            const users = await this.getAll() || []; // Assurez-vous que getAll() est une méthode asynchrone si nécessaire
            const tableUsers = [];
    
            if (users.length > 0) {
                users.forEach((user) => {
                    if (user.userType !== 'Admin' && !user.isValid) {
                        tableUsers.push(user);
                    }
                });
            }
    
            // Vérification de l'unicité des utilisateurs dans tableUsers
            const uniqueUsers = Array.from(new Set(tableUsers.map(user => user.id))); // Assurez-vous que chaque utilisateur a un identifiant unique
            const filteredUsers = uniqueUsers.map(id => tableUsers.find(user => user.id === id));
    
            return filteredUsers;
    
        } catch (error) {
            throw error;
        }
    }
    
    static async getUsersToDashboard(){
        try{
     return await UserRepository.getUsersToDashboard();
        }catch(error){
            throw error;
        }
    }
    static async getAdminStat(){
        try{
            return await UserRepository.getAdminStat();
        }catch(error){
            throw error;
        }
    }

}

module.exports=UserService;