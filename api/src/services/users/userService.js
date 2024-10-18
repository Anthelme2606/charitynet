const UserRepository = require('../../repositories/users/userRepository');
const SessionRepository = require('../../repositories/users/sessionRepository');
const BeneficiaireReposistory = require('../../repositories/beneficiaires/beneficiaireRepository');

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

}

module.exports=UserService;