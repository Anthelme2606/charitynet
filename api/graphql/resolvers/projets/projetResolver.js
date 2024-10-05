const ProjetService = require("../../../src/services/projets/projetService");

module.exports = {
  Query: {
   
    getProjets: async (_, args, { user }) => {
      return await ProjetService.getProjets();
    },


    getProjet: async (_, { projetId }, { user }) => { 
      return await ProjetService.getProjet(projetId);     
    },
  },

  Mutation: {
   
    createProjet: async (_, { input }, { user }) => {
      return await ProjetService.createProjet(input,user);
    },


    updateProjet: async (_, {projetId, input }, { user }) => {
      return await ProjetService.updateProjet(projetId,input,user);
    },
    validProjet: async (_, { projetId }, { user }) => {
    
      return await ProjetService.validProjet(projetId,user);
    },
    finishProjet: async (_, { projetId,dateFin }, { user }) => {
        
         return await ProjetService.finishProjet(projetId,dateFin,user);
       },
       startProjet: async (_, { projetId,dateDebut }, { user }) => {
        
         return await ProjetService.startProjet(projetId,dateDebut,user);
       },
  },
  Projet: {
    beneficiaire:async(parent)=>{
      return await ProjetService.getBeneficiaire(parent.id);
    }
  }
};
