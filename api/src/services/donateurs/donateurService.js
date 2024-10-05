const DonateurReposistory = require('../../repositories/donateurs/donateurRepository');
const UserReposistory = require('../../repositories/users/userRepository');

class DonateurService{
    static async create(data){
        try{
             const user=await UserReposistory.getById(data.userId);
             if(!user){
                throw new Error('An error occured where creating your account');
             }
             await UserReposistory.update(user.id,{userType:"Donor"});
            return await DonateurReposistory.create(data);

        }catch(error){
            throw error;
        }
    }
    static async update(donorId,data){
        try{
            return await DonateurReposistory.update(donorId,data);
        }catch(error){
            throw error;
        }
    }
    static async getById(donorId){
        try{
            return await DonateurReposistory.getById(donorId);
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
            return await DonateurReposistory.getAll();
        }catch(error){
            throw error;
        }
    }

}

module.exports=DonateurService;