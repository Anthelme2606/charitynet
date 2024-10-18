import {gql} from 'graphql-tag';


export const  LOGIN_USER=gql`
mutation Login($input: LoginInput) {
  login(input: $input) {
    token
    user {
      email
      id
      country
      referenceNumber
      userType
      username
    }
    lifeTime
  }
}

`;
export const REFRESH_TOKEN=gql`
mutation RefreshToken($token: String) {
  refreshToken(token: $token) {
    token
    expireAt
  }
}`;
export const CREATE_PROJECT=gql`
mutation CreateProjet($input: ProjetInput!, $image: Upload) {
  createProjet(input: $input, image: $image) {
    titre
    image
    description
    objectif
    resume
    domaine
    dateDebut
    dateFin
  }
}
`;