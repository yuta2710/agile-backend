import App from "./configs/app.config";
import "dotenv/config";
import { validateEnv } from "./utils/validate-env.util";

validateEnv();

const app = new App([], Number(process.env.PORT));

app.listen();