const SessionService = require("../../../src/services/users/sessionService");

module.exports = {
  Query: {
   
    getSession: async (_, {input}, { user }) => {
      return await SessionService.getByToken(input);
    },


    
  },

  Mutation: {
   
    refreshToken: async (_, { token }, { user }) => {
      return await SessionService.refreshToken(token);
    },


   
  },
  Session:{
    user:async(parent)=>{
      return await SessionService.getAuth(parent.userId);
    }
  }
};
