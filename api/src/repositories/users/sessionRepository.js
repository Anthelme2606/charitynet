const SessionModel=require('../../models/users/sessionModel');
const jwt = require('jsonwebtoken');

class SessionRepository {

    static async createSession(data) {
        try {
          
            const expireAt=await this.converTime(process.env.LIFE_TIME);
            data.expireAt = expireAt;
    
            // Create the session
            const session = await SessionModel.create(data);
            return session;
        } catch (error) {
            throw error;
        }
    }
    static async converTime(lifeTime){
        try{
            const date = new Date();
             let expireTimeInMinutes;
            if (lifeTime.endsWith('h')) {
                const hours = parseInt(lifeTime.slice(0, -1), 10);
                expireTimeInMinutes = hours * 60; 
            } 
           
            else if (lifeTime.endsWith('m')) {
                expireTimeInMinutes = parseInt(lifeTime.slice(0, -1), 10);
            } else {
                throw new Error("Invalid LIFE_TIME format. Use 'Nh' or 'Nm' (e.g., '2h', '30m').");
            }
    
           
           return new Date(date.getTime() + expireTimeInMinutes * 60 * 1000);
            
           
            
        }catch(error){
            throw error;
        }
    }
    static async isSessionExpired(lifeTime) {
        const expireAt = await this.converTime(lifeTime); 
        const now = new Date(); 
    
        
        return now > expireAt;
    }
    static async getByToken(token){
        try{
            const session=await SessionModel.findOne({where:{token}});
            if(!session){
                throw new Error('Any session found');
            }
            // const expire= await this.isSessionExpired(session.expireAt);
            // if(expire){
            //     throw new Error('session is expired');
            // }

            return session;

        }catch(error){
            throw error;
        }
    }
    static async getById(sessionId){
        try{
            const session=await SessionModel.findByPk(sessionId);
            if(!session){
                throw new Error('Any session found');
            }
            // const expire= await this.isSessionExpired(session.expireAt);
            // if(expire){
            //     throw new Error('session is expired');
            // }
           
            return session;

        }catch(error){
            throw error;
        }
    }
    static async update(sessionId, data) {
        try {
          const session = await this.getById(sessionId);
          await session.update(data);
          return session;
        } catch (error) {
          
          throw new Error(`Erreur lors de la mise à jour du user: ${error.message}`);
        }
      }
    static async refreshToken(token){
        try{
            const session=await this.getByToken(token);
            const userToken = jwt.sign(
                { id: session.userId},
                process.env.SECRET_KEY,
                { expiresIn:  process.env.LIFE_TIME } 
              );
              const expireAt=await this.converTime(process.env.LIFE_TIME);
              const data={};
              data.token=userToken;
              data.userId=session.userId;
              data.expireAt=expireAt;
              return await this.update(session.id,data);



        }catch(error){
            throw error;
        }
    }
    static async getByUserId(userId){
        try{
            const session= await SessionModel.findeOne({where:{userId} });
            if(!session){
                throw new Error('Any user found');
            }
            return session;

        }catch(error){
            throw error;
        }
    }
}
module.exports=SessionRepository;