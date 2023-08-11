import App from "./configs/app.config";
import "dotenv/config";
import { validateEnv } from "./utils/validate-env.util";
import UserController from "./modules/user/user.controller";
import AuthController from "./modules/auth/auth.controller";
import WorkspaceController from "./modules/workspace/workspace.controller";

validateEnv();

const app = new App(
    [new UserController(), new AuthController(), new WorkspaceController()],
    Number(process.env.PORT)
);

app.listen();