const {gql}=require('graphql-tag');
module.exports=gql`
type Mailer {
message:String
}
input MailerInput {
    username:String
    code:String
    message:String
}
type Mutation {
    sendMail(receiver:String,subject:String,input:MailerInput):Mailer
}
`;