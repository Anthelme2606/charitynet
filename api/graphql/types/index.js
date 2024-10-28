const { gql } = require("graphql-tag");
const userTypes = require("./users/userType");
const sessionTypes = require("./users/sessionType");
const beneficiaireTypes = require("./beneficiaires/beneficiaireType");
const donateurTypes = require("./donateurs/donateurType");
const projetTypes = require("./projets/projetType");
const trackingTypes = require("./projets/trackingType");
const mailerTypes = require("./mailer/mailerType");
module.exports = gql`
  ${userTypes}
  ${beneficiaireTypes}
  ${donateurTypes}
  ${projetTypes}
  ${sessionTypes}
  ${trackingTypes}
  ${mailerTypes}
`;
