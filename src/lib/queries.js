import {gql} from 'graphql-tag';
export const CURRENT_USER=gql`
query CurrentUser {
    currentUser {
      id
      username
      userType
      referenceNumber
      email
      country
    }
  }
`;
export const GET_BENEFICIAIRES=gql`
query GetBeneficiaires {
  getBeneficiaires {
    id
    birthDate
  }
}

`;
export const GET_USERS=gql`
query GetUsers{
  getUsers{
    username
    email
  }
}`;
export const GET_ME_BENEFICIAIRE=gql`
query GetCurrentBeneficiaire {
  getCurrentBeneficiaire {
    id
    identificationNumber
    beneficiaryType
    birthDate
    biography
    phoneNumber
    legalStatus
    user {
      id
      username
      email
      country
      userType
      referenceNumber
    }
    myProjets {
      id
      image
      titre
      description
      objectif
      resume
      domaine
      statut
      dateDebut
      dateFin
      isValid
      createdAt
      updatedAt
    }
  }
}

`;
