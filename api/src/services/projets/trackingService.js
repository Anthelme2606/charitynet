const TrackingProjectRepository = require("../../repositories/projets/trackingRepository");
const UserRepository=require("../../repositories/users/userRepository");
class TrackinProjectService{
    static async getTrackingProjects(){
  try{
    return await TrackingProjectRepository.getTrackingProjectsForCurrentMonth();

  }catch(error){
    throw error;
  }
    }
    static async getUser(userId){
    try{
      return await UserRepository.getById(userId);
    }catch(error){
        throw error;
    }
    }
}

module.exports=TrackinProjectService;