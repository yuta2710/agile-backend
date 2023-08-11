import App from "./configs/app.config";
import "dotenv/config";
import { validateEnv } from "./utils/validate-env.util";
import UserController from "./modules/user/user.controller";
import AuthController from "./modules/auth/auth.controller";

validateEnv();

const app = new App([new UserController(), new AuthController()], Number(process.env.PORT));

app.listen();