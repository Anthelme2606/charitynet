const ProjetModel = require('../../models/projets/projetModel');

class ProjetRepository {
    // Create a new project
    static async createProjet(data, auth) {
        try {
            // Only Beneficiaries or Admins can create a project
            if (auth.userType !== 'Beneficiary') {
                throw new Error('Unauthorized: Only beneficiaries or admins can create a project.');
            }
          data.beneficiaireId=auth.id;
            const projet = await ProjetModel.create(data);
            return projet;
        } catch (error) {
            throw error;
        }
    }

    // Update an existing project
    static async updateProjet(id, data, auth) {
        try {
            // Check if the user is an Admin
            if (auth.userType !== 'Beneficiary') {
                throw new Error('Unauthorized: Only Beneficiairy can update a project.');
            }
            const projet=await this.getProjet(id);
            if(projet && projet.isValid){
                throw new Error('Unauthorized: Projet is already validate.');
            }

            const [updated] = await ProjetModel.update(data, {
                where: { id },
            });

            if (updated) {
                const updatedProjet = await ProjetModel.findOne({ where: { id } });
                return updatedProjet;
            }
            throw new Error('Project not found');
        } catch (error) {
            throw error;
        }
    }

    // Get a specific project by ID
    static async getProjet(id) {
        try {
            const projet = await ProjetModel.findOne({ where: { id } });
            if (!projet) {
                throw new Error('Project not found');
            }
            return projet;
        } catch (error) {
            throw error;
        }
    }

    // Get all projects
    static async getProjets() {
        try {
            const projets = await ProjetModel.findAll();
            return projets;
        } catch (error) {
            throw error;
        }
    }

    // Start a project
    static async startProjet(id, dateDebut, auth) {
        try {
            // Only Beneficiaries or Admins can start a project
            if (auth.userType !== 'Beneficiary' && auth.userType !== 'Admin') {
                throw new Error('Unauthorized: Only beneficiaries or admins can start a project.');
            }

            const [updated] = await ProjetModel.update(
                { dateDebut, statut: 'En cours' },
                { where: { id } }
            );

            if (updated) {
                return await ProjetModel.findOne({ where: { id } });
            }
            throw new Error('Project not found');
        } catch (error) {
            throw error;
        }
    }

    // Finish a project
    static async finishProjet(id, dateFin, auth) {
        try {
            // Only Admins can finish a project
            if (auth.userType !== 'Admin') {
                throw new Error('Unauthorized: Only admins can finish a project.');
            }

            const [updated] = await ProjetModel.update(
                { dateFin, statut: 'Terminé' },
                { where: { id } }
            );

            if (updated) {
                return await ProjetModel.findOne({ where: { id } });
            }
            throw new Error('Project not found');
        } catch (error) {
            throw error;
        }
    }

    // Validate a project
    static async validProjet(id, admin) {
        try {
            // Only Admins can validate a project
            if (admin.userType !== 'Admin') {
                throw new Error('Unauthorized: Only admins can validate a project.');
            }

            const [updated] = await ProjetModel.update(
                { isValid: true },
                { where: { id } }
            );

            if (updated) {
                return await ProjetModel.findOne({ where: { id } });
            }
            throw new Error('Project not found');
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProjetRepository;
