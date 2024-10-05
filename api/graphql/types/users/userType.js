const { gql } = require("graphql-tag");

const userTypes = gql`
  type User {
    id: Int
    username: String
    email: String
    country: String
    userType: String
    referenceNumber:String
    member:Beneficiaire
  }
  enum Member{
    Beneficiare
    Donateur

  }

  input UserInput {
    email: String
    country: String
    password: String
  }

  input LoginInput {
    username: String
    password: String
  }

  type AuthData {
    token: String
    user: User
  }

  type Query {
    getUsers: [User]
    getUser(id: Int): User
  }

  type Mutation {
    signup(input: UserInput): User
    login(input: LoginInput): AuthData
    updateUser(input:UserInput):User
  }
`;

module.exports = userTypes;
