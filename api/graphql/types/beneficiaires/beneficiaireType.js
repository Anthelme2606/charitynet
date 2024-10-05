const { gql } = require("graphql-tag");

const beneficiareTypes = gql`
 # Type de bénéficiaire
type Beneficiaire {
  id: Int
  identificationNumber: String!
  beneficiaryType: String!
  birthDate: String
  biography: String
  phoneNumber: String!
  legalStatus: String
  user: User!
}

# Enum pour le type de bénéficiaire
enum BeneficiaryType {
  Individual
  Organization
}

# Input pour la création d'un bénéficiaire
input BeneficiaireInput {
  identificationNumber: String!
  beneficiaryType: BeneficiaryType!
  birthDate: String
  biography: String
  phoneNumber: String!
  legalStatus: String
 
}

# Input pour la mise à jour d'un bénéficiaire
input BeneficiaireUpdateInput {
  identificationNumber: String
  beneficiaryType: BeneficiaryType
  birthDate: String
  biography: String
  phoneNumber: String
  legalStatus: String
}


  type Query {
    getBeneficiaires:[Beneficiaire]
    getBeneficiaire(id: Int): Beneficiaire
  }

  type Mutation {
    createBeneficiare(input: BeneficiaireInput): Beneficiaire
    updateBeneficiare(input: BeneficiaireUpdateInput): Beneficiaire
  }
`;

module.exports = beneficiareTypes;
