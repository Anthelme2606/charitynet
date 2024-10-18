const ProjetService = require("../../../src/services/projets/projetService");
const { GraphQLUpload } = require('graphql-upload-minimal');

module.exports = {
  Upload: GraphQLUpload,
  Query: {
   
    getProjets: async (_, args, { user }) => {
      return await ProjetService.getProjets();
    },


    getProjet: async (_, { projetId }, { user }) => { 
      return await ProjetService.getProjet(projetId);     
    },
  },

  Mutation: {
   
    createProjet: async (_, { image, input }, { user }) => {
      // Vérifiez d'abord si l'utilisateur est authentifié
      if (!user || !user.id) {
        throw new Error("Utilisateur non authentifié");
      }
    
      
      const auth = await ProjetService.getUser(user.id);
    
     
      console.log("Image reçue dans le resolver:", image);
    
      
      if (image) {
        input.image = image;
      } else {
        console.warn("Aucune image reçue");
      }
    
     
      console.log("Input avant la création du projet:", input);
    
    
      return await ProjetService.createProjet(input, auth);
    },
    


    updateProjet: async (_, {projetId, input }, { user }) => {
      const auth=await ProjetService.getUser(user.id);
      return await ProjetService.updateProjet(projetId,input,auth);
    },
    validProjet: async (_, { projetId }, { user }) => {
      const auth=await ProjetService.getUser(user.id);
      return await ProjetService.validProjet(projetId,auth);
    },
    finishProjet: async (_, { projetId,dateFin }, { user }) => {
      const auth=await ProjetService.getUser(user.id);
         return await ProjetService.finishProjet(projetId,dateFin,auth);
       },
       startProjet: async (_, { projetId,dateDebut }, { user }) => {
        const auth=await ProjetService.getUser(user.id);
         return await ProjetService.startProjet(projetId,dateDebut,auth);
       },
  },
  Projet: {
    beneficiaire:async(parent)=>{
      return await ProjetService.getBeneficiaire(parent.beneficiaireId);
    }
  }
};
