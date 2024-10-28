const UserResolver =require('./users/userResolver');
const SessionResolver =require('./users/sessionResolver');
const BeneficiaireResolver =require('./beneficiaires/beneficiaireResolver');
const DonateurResolver =require('./donateurs/donateurResolver');
const ProjetResolver =require('./projets/projetResolver');
const TrackingResolver =require('./projets/trackingResolver');
const MailerResolver =require('./mailer/mailerResolver');

const {merge} = require("lodash");
const resolvers = merge({},
    UserResolver,
    BeneficiaireResolver,
    DonateurResolver,
    ProjetResolver,
    SessionResolver,
    TrackingResolver,
    MailerResolver

);
module.exports = resolvers;