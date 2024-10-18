const ProjetRepository=require('../../repositories/projets/projetRepository');
const UserRepository=require('../../repositories/users/userRepository');
const BeneficiaireRepository=require('../../repositories/beneficiaires/beneficiaireRepository');
const saveFile=require('../../../utils/saveFile');
class ProjetService {
    static async createProjet(data, auth) {
        const bene = await this.getByUser(auth.id);
        data.beneficiaireId = bene.id;
    
        // Vérifier si l'image est fournie
        let fileUrl;
        if (data.image) {
            // Si une image est fournie, on la sauvegarde
            const filePath = await saveFile(data.image);
            fileUrl = `${process.env.APP_URL}${filePath}`;
        } else {
            // Utiliser un placeholder si aucune image n'est fournie
            fileUrl = `${process.env.APP_URL}/uploads/project.png`;
        }
    
        // Assigner l'URL de l'image (ou du placeholder) à data.image
        data.image = fileUrl;
    
        // Créer le projet
        data.domaine=await this.normalizeString(data.domaine);
        return await ProjetRepository.createProjet(data, auth);
    }
    
    static async validProjet(id,auth){
        return await ProjetRepository.validProjet(id,auth);
    }
    static async updateProjet(id,data,auth){
        return await ProjetRepository.updateProjet(id,data,auth);
    }
    static async finishProjet(id,dateFin,auth){
        return await ProjetRepository.finishProjet(id,dateFin,auth);
    }
    static async startProjet(id,dateDebut,auth){
        return await ProjetRepository.startProjet(id,dateDebut,auth);
    }
    static async getProjets(){
        return await ProjetRepository.getProjets();
    }
    static async getProjet(id){
        return await ProjetRepository.getProjet(id);
    }
    static async getBeneficiaire(userId){
        return await BeneficiaireRepository.getById(userId);
    }
    static async getUser(id){
        return await UserRepository.getById(id);
    }
    static async getByUser(id){
        try{
            const  beneficiaire =await BeneficiaireRepository.getByUser(id);
            if(!beneficiaire){
                throw new Error('this user is a beneficiaire !, try to register as beneficiary');
            }
            return beneficiaire;
        }catch(error){
            throw error;
        }
      
    
    }
    static async normalizeString(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      }

}

module.exports=ProjetService