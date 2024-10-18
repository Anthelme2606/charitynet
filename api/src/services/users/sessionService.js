const SessionRepository = require('../../repositories/users/sessionRepository');
const UserRepository = require('../../repositories/users/userRepository');
class SessionService {
 static async refreshToken(token){
    return await SessionRepository.refreshToken(token);
 }
 static async getByToken(token){
    return await SessionRepository.getByToken(token);
 }
 static async getAuth(userId){
    return await UserRepository.getById(userId);
 }
}
module.exports=SessionService;