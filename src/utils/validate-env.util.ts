import { cleanEnv, str, port } from "envalid";

export const validateEnv = (): void => {
    cleanEnv(process.env, {
        MONGO_URI: str(), 
        JWT_COOKIE_EXPIRE: str(),
        PORT: port({default: 8080}), 
        JWT_SECRET: str(),
        API_VERSION_1: str()
    })
}