const DonateurModel = require('../../models/donateurs/donateurModel');

class DonateurRepository {
  // Créer un nouveau donateur
  static async create(data) {
    try {
      const exist=await this.getByPhone(data.phoneNumber);
      if(exist){
        throw new Error('user with this phone number is already set');
      }
      const newDonateur = await DonateurModel.create(data);
      return newDonateur;
    } catch (error) {
      throw error;
    }
  }

  static async getByPhone(phone){
    try{
 return await DonateurModel.findOne({where:{phoneNumber:phone}});
    }catch(error){
        throw error;
    }
  }

  
  static async update(id, data) {
    try {
      const donateur = await this.getById(id);
      if (!donateur) {
        throw new Error('Donateur non trouvé');
      }

     
      await donateur.update(data);
      return donateur;
    } catch (error) {
      throw error;
    }
  }

 
  static async getById(id) {
    try {
      const donateur = await DonateurModel.findByPk(id);
      if (!donateur) {
        throw new Error('Donateur non trouvé');
      }
      return donateur;
    } catch (error) {
      throw error;
    }
  }

  
  static async getAll() {
    try {
      const donateurs = await DonateurModel.findAll();
      return donateurs;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DonateurRepository;
