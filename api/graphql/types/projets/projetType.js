const { gql } = require("graphql-tag");

module.exports = gql`
  # Type pour un projet
  type Projet {
    id: Int!
    titre: String!
    description: String!
    domaine: DomaineEnum!
    statut: StatutEnum!
    dateDebut: String
    dateFin: String
    isValid: Boolean!
    beneficiaire: Beneficiaire
    createdAt: String
    updatedAt: String
  }

  # Enum pour les domaines
  enum DomaineEnum {
    Education
    Sante
    Social
    Culturel
    Financier
    Environnement
    Technologie
    Sport
    Agriculture
    Infrastructure
    Autre
  }

  # Enum pour les statuts
  enum StatutEnum {
    Pending
    InProgress
    Completed
  }

  # Input pour créer un projet
  input ProjetInput {
    titre: String!
    description: String!
    domaine: DomaineEnum!
  }

  # Input pour mettre à jour un projet
  input ProjetUpdateInput {
    titre: String
    description: String
    domaine: DomaineEnum
    statut: StatutEnum
  }

  type Query {
    getProjets: [Projet]
    getProjet(projetId: Int!): Projet
  }

  type Mutation {
    createProjet(input: ProjetInput!): Projet
    updateProjet(projetId: Int!, input: ProjetUpdateInput!): Projet
    startProjet(projetId: Int!, dateDebut: String!): Projet
    finishProjet(projetId: Int!, dateFin: String!): Projet
    validProjet(projetId: Int!): Projet
  }
`;
