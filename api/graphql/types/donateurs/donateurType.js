const {gql}=require('graphql-tag');
module.exports=gql`
type Donateur {
  id: Int
  donorType: String
  firstName: String
  lastName: String
  organizationName: String
  phoneNumber: String!
  biography: String
  user: User!
}

input DonateurInput {
  donorType: DonateurType!
  firstName: String
  lastName: String
  organizationName: String
  phoneNumber: String!
  biography: String
}

input DonateurUpdateInput {
  firstName: String
  lastName: String
  organizationName: String
  email: String
  phoneNumber: String
  biography: String
}

enum DonateurType {
  Individual
  Organization
}

type Query {
getDonateur(id:Int):Donateur
getDonateurs:[Donateur]
}

type Mutation {
    createDonateur(input:DonateurInput):Donateur
    updateDonateur(input:DonateurUpdateInput):Donateur
}
`;