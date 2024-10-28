// Utiliser un moteur de template
const ejs = require('ejs');
const path = require('path');
const nodemailer=require('nodemailer');

class MailerService {
    static async sendMail(receiver, subject, templateData) {
        try {
            const from = process.env.FROM;
            const password = process.env.APP_PASSWORD;
            templateData.receiver=receiver;
            const transporter = await this.createTransporter(from, password);

            // Charger et générer le HTML à partir d'un fichier de template EJS
            const emailHtml = await ejs.renderFile(
                path.join(__dirname, '../../../templates', 'email.ejs'),
                templateData
            );

            await transporter.sendMail({
                from: from,
                to: receiver,
                subject: subject,
                html: emailHtml, // Utilisation du HTML généré par EJS
            });

            console.log('E-mail envoyé avec succès');
            const message="Envoi réussi";
            return {message};
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
            throw error;
        }
    }
    // Fonction pour créer le transporteur
    static async createTransporter(from, pass) {
        return nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: from,
                pass: pass,
            },
        });
    }
}

module.exports = MailerService;
