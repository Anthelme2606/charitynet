const MailerService = require("../../../src/services/mailer/mailerService");
module.exports={
    Mutation:{
        sendMail:async(_,{receiver,subject,input})=>{
            return await MailerService.sendMail(receiver,subject,input);
        }
    }
}