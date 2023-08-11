import User from "@/modules/user/user.interface";
import jwt from "jsonwebtoken";
import Token from "./interfaces/token.interface";

export const sendTokenResponse = (user: User): string => {
    return jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

export const verifyToken = async (token: string): Promise<Token | jwt.JsonWebTokenError> => {
    return new Promise((resolve, reject) => {
        return jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
            if(err) reject(err);

            resolve(payload as Token);
        })
    })
} 