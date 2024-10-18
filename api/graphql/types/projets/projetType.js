const { gql } = require("graphql-tag");

module.exports = gql`
  # Type pour un projet
  scalar Upload
  type Projet {
    id: Int!
    image:String
    titre: String!
    description: String!
    objectif: Float!
    resume: String!
    domaine: String
    statut: String!
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
  objectif: Float!  # Utilisation de Float pour un montant financier
  resume: String!  # Correctement défini comme String pour un texte
  description: String!
  domaine: DomaineEnum!
  dateDebut: String
  dateFin: String
}


  # Input pour mettre à jour un projet
  input ProjetUpdateInput {
    image:Upload
    titre: String
    objectif: Float!  
    resume: String! 
    description: String
    domaine: DomaineEnum
    statut: StatutEnum
    dateDebut: String
    dateFin: String
  
  }

  type Query {
    getProjets: [Projet]
    getProjet(projetId: Int!): Projet
  }

  type Mutation {
    createProjet(image:Upload,input: ProjetInput!): Projet
    updateProjet(projetId: Int!, input: ProjetUpdateInput!): Projet
    startProjet(projetId: Int!, dateDebut: String!): Projet
    finishProjet(projetId: Int!, dateFin: String!): Projet
    validProjet(projetId: Int!): Projet
  }
`;
