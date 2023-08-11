"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const envalid_1 = require("envalid");
const validateEnv = () => {
    (0, envalid_1.cleanEnv)(process.env, {
        MONGO_URI: (0, envalid_1.str)(),
        JWT_COOKIE_EXPIRE: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)({ default: 8080 }),
        JWT_SECRET: (0, envalid_1.str)(),
        API_VERSION_1: (0, envalid_1.str)()
    });
};
exports.validateEnv = validateEnv;
//# sourceMappingURL=validate-env.util.js.map