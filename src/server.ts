import App from "./configs/app.config";
import "dotenv/config";
import { validateEnv } from "./utils/validate-env.util";
import UserController from "./modules/user/user.controller";

validateEnv();

const app = new App([new UserController()], Number(process.env.PORT));

app.listen();