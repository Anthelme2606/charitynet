const UserResolver =require('./users/userResolver');
const SessionResolver =require('./users/sessionResolver');
const BeneficiaireResolver =require('./beneficiaires/beneficiaireResolver');
const DonateurResolver =require('./donateurs/donateurResolver');
const ProjetResolver =require('./projets/projetResolver');

const {merge} = require("lodash");
const resolvers = merge({},
    UserResolver,
    BeneficiaireResolver,
    DonateurResolver,
    ProjetResolver,
    SessionResolver

);
module.exports = resolvers;