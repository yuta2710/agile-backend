"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("./configs/app.config"));
require("dotenv/config");
const validate_env_util_1 = require("./utils/validate-env.util");
const user_controller_1 = __importDefault(require("./modules/user/user.controller"));
const auth_controller_1 = __importDefault(require("./modules/auth/auth.controller"));
const workspace_controller_1 = __importDefault(require("./modules/workspace/workspace.controller"));
(0, validate_env_util_1.validateEnv)();
const app = new app_config_1.default([new user_controller_1.default(), new auth_controller_1.default(), new workspace_controller_1.default()], Number(process.env.PORT));
app.listen();
//# sourceMappingURL=server.js.map