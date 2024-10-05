const UserResolver =require('./users/userResolver');
const BeneficiaireResolver =require('./beneficiaires/beneficiaireResolver');
const DonateurResolver =require('./donateurs/donateurResolver');
const ProjetResolver =require('./projets/projetResolver');

const {merge} = require("lodash");
const resolvers = merge({},
    UserResolver,
    BeneficiaireResolver,
    DonateurResolver,
    ProjetResolver

);
module.exports = resolvers;