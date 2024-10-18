const { gql } = require("graphql-tag");

const sessionTypes = gql`
  type Session {
    id: Int
    expireAt: String
    token:String
    user:User
  }
 

 input TokenInput{
    token:String
 }

  

  

  type Query {
    getSession: Session
   
  }


  type Mutation {
    refreshToken(token: String): Session
   
  }
`;

module.exports = sessionTypes;
