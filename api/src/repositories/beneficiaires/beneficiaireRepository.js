const BeneficiaireModel = require('../../models/beneficiaires/beneficiaireModel');

class BeneficiaireRepository {
  
  static async create(data) {
    try {
      const exist=await this.getByPhone(data.phoneNumber);
      if(exist){
        throw new Error('user with this phone number is already set');
      }
      const newB = await BeneficiaireModel.create(data);
      
      return newB;
    } catch (error) {
      // Gestion des erreurs
      throw new Error(`Erreur lors de la création du bénéficiaire: ${error.message}`);
    }
  }
  static async getByPhone(phone){
    try{
 return await BeneficiaireModel.findOne({where:{phoneNumber:phone}});
    }catch(error){
        throw error;
    }
  }
  static async getById(beneId) {
    try {
     
      const bene = await BeneficiaireModel.findByPk(beneId);
      if (!bene) {
        throw new Error('Bénéficiaire non trouvé');
      }
      return bene;
    } catch (error) {
     
      throw new Error(`Erreur lors de la récupération du bénéficiaire: ${error.message}`);
    }
  }
  static async getByUser(userId) {
    try {
     
      const bene = await BeneficiaireModel.findOne({where:{userId}});
      if (!bene) {
        throw new Error('Bénéficiaire non trouvé');
      }
      return bene;
    } catch (error) {
     
      throw new Error(`Erreur lors de la récupération du bénéficiaire: ${error.message}`);
    }
  }

  static async update(beneId, data) {
    try {
      const bene = await this.getById(beneId);
      if (!bene) {
        throw new Error('Bénéficiaire non trouvé pour cet utilisateur');
      }

      await bene.update(data);
      return bene;
    } catch (error) {
      
      throw new Error(`Erreur lors de la mise à jour du bénéficiaire: ${error.message}`);
    }
  }

  static async getAll() {
    try {
   
      const benes = await BeneficiaireModel.findAll();
      return benes;
    } catch (error) {
 
      throw new Error(`Erreur lors de la récupération des bénéficiaires: ${error.message}`);
    }
  }
}

module.exports = BeneficiaireRepository;
