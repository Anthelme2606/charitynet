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
export const VALID_PROJECT=gql`
mutation ValidProjet($projetId: Int!) {
  validProjet(projetId: $projetId) {
    isValid
    id
    createdAt
    statut
    objectif
    titre
  }
}
`;
export const SIGN_UP=gql`
mutation Signup($input: UserInput) {
  signup(input: $input) {
    email
    country
    username
  }
}

`;
export const SEND_MAIL=gql`
mutation SendMail($receiver: String, $subject: String, $input: MailerInput) {
  sendMail(receiver: $receiver, subject: $subject, input: $input) {
    message
  }
}
`;
