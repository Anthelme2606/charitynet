const BeneficiaireService = require("../../../src/services/beneficiaires/beneficiaireService");

module.exports = {
  Query: {
   
    getBeneficiaires: async (_, args, { user }) => {
      return await BeneficiaireService.getAll();
    },


    getBeneficiaire: async (_, { beneId }, { user }) => { 
      return await BeneficiaireService.getById(beneId);     
    },
    getCurrentBeneficiaire: async (_, args, { user }) => { 
      return await BeneficiaireService.getCurrentBeneficiaire(user.id);     
    },
  },

  Mutation: {
   
    createBeneficiare: async (_, { input }, { user }) => {
     input.userId=user.id;
      return await BeneficiaireService.create(input);
    },


    updateBeneficiare: async (_, { input }, { user }) => {
      const userId=user.id
      return await BeneficiaireService.update(userId,input);
    },
  },
  Beneficiaire:
 { user:async (parent)=>{
    return await BeneficiaireService.getUser(parent.userId);
  },
  myProjets:async(parent)=> {
    return await BeneficiaireService.getMyProjects(parent.id);
  }
}
};
