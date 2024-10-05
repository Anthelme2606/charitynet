const ProjetRepository=require('../../repositories/projets/projetRepository');
const BeneficiaireRepository=require('../../repositories/beneficiaires/beneficiaireRepository');
class ProjetService {
    static async createProjet(data,auth){
        return await ProjetRepository.createProjet(data,auth);
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
    static async getBeneficiaire(id){
        return await BeneficiaireRepository.getById(id);
    }

}

module.exports=ProjetService