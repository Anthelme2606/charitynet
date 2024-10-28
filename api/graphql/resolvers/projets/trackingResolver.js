const TrackinProjectService = require("../../../src/services/projets/trackingService")

module.exports={
    Query:{
    getTrackingProjects:async(_,args,{user})=>{
        return await TrackinProjectService.getTrackingProjects();
    }
    },
    TrackingProject:{
        user:async(parent)=>{
           return await TrackinProjectService.getUser(parent.userId);
        }
    }

}