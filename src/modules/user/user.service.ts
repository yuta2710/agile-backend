import userModel from "./user.model";
import User from "./user.interface";

class UserService {
    private model = userModel;

    public createUser = async (
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<User | Error> => {
        try {
            const serializeObj: User = await this.model.create({
                name,
                email,
                password,
                role,
            });
            console.log(serializeObj);
            return serializeObj;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    public getAllUsers = async (): Promise<User[] | Error> => {
        try {
            const objs: User[] = await this.model.find();

            return objs;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    public fetchUserById = async (userId: string): Promise<User | Error> => {
        try {
            const obj: User | Error = await this.model
                .findById(userId as string)
                .exec();

            if (!obj) {
                throw new Error(`User <${userId}> not found`);
            }
            return obj;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    public updateUser = async (
        userId: string,
        newObj: Partial<User>
    ): Promise<User | Error> => {
        try {
            const updatedObj = await this.model
                .findByIdAndUpdate(userId as string, newObj as User, {
                    new: true,
                })
                .exec();

            return updatedObj;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    public deleteUser = async (userId: string): Promise<void | Error> => {
        try {
            await this.model.findByIdAndDelete(userId as string);
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

export default UserService;