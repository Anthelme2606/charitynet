const { gql } = require("graphql-tag");
const userTypes = require("./users/userType");
const beneficiaireTypes = require("./beneficiaires/beneficiaireType");
const donateurTypes = require("./donateurs/donateurType");
const projetTypes = require("./projets/projetType");
module.exports = gql`
  ${userTypes}
  ${beneficiaireTypes}
  ${donateurTypes}
  ${projetTypes}
`;
