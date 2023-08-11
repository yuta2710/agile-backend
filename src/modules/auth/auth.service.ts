import User from "../user/user.interface";
import userModel from "../user/user.model";
import UserService from "../user/user.service";
import { sendTokenResponse, verifyToken } from "../../utils/token.utils";

class AuthService {
    public service = new UserService();
    public model = userModel;

    register = async(name: string, email: string, password: string, role: string): Promise<string | Error> => {
        try {
            const user: User|Error = await this.service.createUser(name, email, password, role);
            
            const token = sendTokenResponse(user as User);

            return token;
        } catch (error) {
            throw new Error("Unable to create this user");
        }
    }
    
    login = async(email: string, password: string): Promise<string | Error> => {
        try {
            // Check existence of user 
            // Check valid password or not 
            // generate token
            const user = await this.model.findOne({email}).exec();

            console.log(user);
            
            if(!user) {
                throw new Error(`Unable to create this user <${email}>`)
            }
            
            if(!(await user.isValidPassword(password))){
                throw new Error("Wrong credentials given");
            }
            else{ 
                return sendTokenResponse(user);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    getMe = async(userId: string): Promise<User | Error> => {
        try {
            const me = await this.service.fetchUserById(userId);

            if (!me) {
                throw new Error(`User <${userId}> not found`);
            }

            return me;
        } catch (error) {
            throw new Error(error.message);
        }
    } 
}

export default AuthService;