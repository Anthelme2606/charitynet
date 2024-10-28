const TrackingProjectModel = require('../../models/projets/trackingModel');
const { Op } = require('sequelize');

class TrackingProjectRepository {
    // Méthode pour créer une opération de création de projet
    static async createOperation(userId) {
      
        return await TrackingProjectModel.create({
            userId,
            numberCreate: 1,
            numberUpdate: 0,
            numberDelete: 0,
        });
    }

    // Méthode pour mettre à jour une opération de projet
    static async updateOperation(userId) {
       
        return await TrackingProjectModel.create({
            userId,
            numberCreate: 0,
            numberUpdate: 1,
            numberDelete: 0,
        });
    }

    // Méthode pour supprimer une opération de projet
    static async deleteOperation(userId) {
       

        return await TrackingProjectModel.create({
            userId,
            numberCreate: 0,
            numberUpdate: 0,
            numberDelete: 1,
        });
    }
    static async getTrackingProjectsForCurrentMonth() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
        // Obtenir tous les trackingProjects du mois actuel
        const trackingProjects = await TrackingProjectModel.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            }
        });
    
        // Calculer les totaux
        const totalCreate = trackingProjects.reduce((sum, project) => sum + project.numberCreate, 0);
        const totalUpdate = trackingProjects.reduce((sum, project) => sum + project.numberUpdate, 0);
        const totalDelete = trackingProjects.reduce((sum, project) => sum + project.numberDelete, 0);
    
        return {
            trackingProjects,
            totalCreate,
            totalUpdate,
            totalDelete,
        };
    }
    
}

module.exports = TrackingProjectRepository;
