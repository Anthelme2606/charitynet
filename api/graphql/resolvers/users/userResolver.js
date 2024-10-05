const UserService = require("../../../src/services/users/userService");

module.exports = {
  Query: {
   
    getUsers: async (_, args, { user }) => {
      return await UserService.getAll();
    },


    getUser: async (_, { userId }, { user }) => { 
      return await UserService.getById(userId);     
    },
  },

  Mutation: {
   
    signup: async (_, { input }, { user }) => {
      return await UserService.createAccount(input);
    },


    login: async (_, { input }, { user }) => {
      return await UserService.login(input);
    },
    updateUser: async (_, { input }, { user }) => {
     const userId=user.id
      return await UserService.update(userId,input);
    },
  },
  User:{
    member:async(parent)=>{
      return await UserService.getBeneficiaire(parent.id);
    }
  }
};
