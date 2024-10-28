const UserService = require("../../../src/services/users/userService");

module.exports = {
 
  Query: {
   
    getUsers: async (_, args, { user }) => {
    
      const users=await UserService.getAll();
 
      return users;
    },
    getUsersToDashboard:async(_,agrs,{user})=>{
      return await UserService.getUsersToDashboard();
    },
    getAdminStat:async(_,args,{user})=>{
      try{
        return await UserService.getAdminStat();
      }catch(error){
        throw error;
      }
    },
    getNonValidUsers:async(_,args,{user})=>{
      try{
        return await UserService.getNonValidUsers();
      }catch(error){
        throw error;
      }
    },


    getUser: async (_, { userId }, { user }) => { 
      return await UserService.getById(userId);     
    },
    currentUser: async (_, args, { user }) => { 
      if (!user) {
        throw new Error('Not authenticated');
    }
      const cuser= await UserService.currentUser(user.id);
    
      return cuser;    
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
