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
export const GET_ADMIN_STAT=gql`
query GetAdminStat {
  getAdminStat {
    beneficiaryPercentage
    donorPercentage
    monthlyProjectPercentage
    obnlPercentage
  }
}
`;
export const GET_NON_VALID_USERS=gql`
query GetNonValidUsers {
  getNonValidUsers {
    country
    email
    id
    createdAt
    userType
    username
    referenceNumber
  }
}
`;
export const GET_TRACKING_PROJECTS=gql`
query GetTrackingProjects {
  getProjets {
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
    beneficiaire {
      beneficiaryType
      biography
      phoneNumber
      user {
        country
        email
        id
        referenceNumber
        userType
        username
      }
    }
  }

  getUsersToDashboard {
    totalUsers
    allDonors
    allBeneficiaries
    statUserMonth
    statDonor
    statBeneficiary
  }
  getTrackingProjects {
    totalCreate
    totalDelete
    totalUpdate
    trackingProjects {
      id
      user {
        username
      }
      numberCreate
      numberUpdate
      numberDelete
    }
  }
}
`;

export const GET_BENEFICIAIRE_AND_TRACKING_PROJECTS = gql`
  query GetBeneficiaireAndTrackingProjects {
  
 

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
    getTrackingProjects {
      totalCreate
      totalDelete
      totalUpdate
      trackingProjects {
        id
        user {
          username
        }
        numberCreate
        numberUpdate
        numberDelete
      }
    }
  }
`;

