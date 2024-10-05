const UserRepository = require('../../repositories/users/userRepository');
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
            return await UserRepository.login(data);
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