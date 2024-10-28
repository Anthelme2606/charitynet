const { gql } = require("graphql-tag");

const userTypes = gql`
  type User {
    id: Int
    username: String
    email: String
    country: String
    userType: String
    referenceNumber:String
    createdAt:String
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
    lifeTime:String
    user: User
  }
  type DashBoardStat {
    totalUsers: Int
    allDonors: Int
    allBeneficiaries: Int
    statUserMonth: Float
    statDonor: Float
    statBeneficiary: Float
}
type AdminStat {
        donorPercentage: Float
        beneficiaryPercentage:Float
        obnlPercentage:Float
        monthlyProjectPercentage: Float
}

  type Query {
    getUsers: [User]
    getUser(id: Int): User
    currentUser:User
    getUsersToDashboard:DashBoardStat 
    getAdminStat:AdminStat
    getNonValidUsers:[User]
  }

  type Mutation {
    signup(input: UserInput): User
    login(input: LoginInput): AuthData
    updateUser(input:UserInput):User
  }
`;

module.exports = userTypes;
