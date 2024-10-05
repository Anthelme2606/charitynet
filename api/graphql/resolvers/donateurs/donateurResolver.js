const DonateurService = require("../../../src/services/donateurs/donateurService");

module.exports = {
  Query: {
   
    getDonateurs: async (_, args, { user }) => {
      return await DonateurService.getAll();
    },


    getDonateur: async (_, { userId }, { user }) => { 
      return await DonateurService.getById(userId);     
    },
  },

  Mutation: {
   
    createDonateur: async (_, { input }, { user }) => {
        input.userId=user.id;
      return await DonateurService.create(input);
    },


   
    updateDonateur: async (_, { input }, { user }) => {
     const userId=user.id
      return await DonateurService.update(userId,input);
    },
  },
  Donateur:
  { user:async (parent)=>{
     return await DonateurService.getUser(parent.userId);
   }
 }
  
};
