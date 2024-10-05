const BeneficiaireReposistory = require('../../repositories/beneficiaires/beneficiaireRepository');
const UserReposistory = require('../../repositories/users/userRepository');

class BeneficiaireService{
    static async create(data){
        try{
             const user=await UserReposistory.getById(data.userId);
             if(!user){
                throw new Error('An error occured where creating your account');
             }
             await UserReposistory.update(user.id,{userType:"Beneficiary"});
            return await BeneficiaireReposistory.create(data);

        }catch(error){
            throw error;
        }
    }
    static async update(beneId,data){
        try{
            return await BeneficiaireReposistory.update(beneId,data);
        }catch(error){
            throw error;
        }
    }
    static async getById(userId){
        try{
            return await BeneficiaireReposistory.getById(userId);
        }catch(error){
            throw error;
        }
    }
    static async getUser(userId){
        try{
            return await UserReposistory.getById(userId);
        }catch(error){
            throw error;
        }
    }
    static async getAll(){
        try{
            return await BeneficiaireReposistory.getAll();
        }catch(error){
            throw error;
        }
    }

}

module.exports=BeneficiaireService;