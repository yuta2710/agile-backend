"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("../middleware/error.middleware");
class App {
    express;
    port;
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeDatabaseConnection();
        this.initializeErrorHandlers();
        this.initializeGeneralMiddleware();
        this.initializeControllers(controllers);
    }
    initializeDatabaseConnection = async () => {
        try {
            const { MONGO_URI } = process.env;
            console.log(MONGO_URI);
            await mongoose_1.default.connect(MONGO_URI);
            console.log(colors_1.default.green.bold("Database connected successfully"));
        }
        catch (error) {
            throw new Error(`Failed to connected MongoDB`);
        }
    };
    initializeControllers(controllers) {
        controllers.map(controller => (this.express.use(`api/${process.env.API_VERSION_1}`, controller.router)));
    }
    initializeErrorHandlers() {
        this.express.use(error_middleware_1.errorResponseMiddleware);
    }
    initializeGeneralMiddleware() {
        this.express.use((0, cors_1.default)());
        this.express.use((0, helmet_1.default)());
        this.express.use((0, morgan_1.default)("dev"));
        this.express.use((0, compression_1.default)());
        this.express.use((0, cookie_parser_1.default)());
        this.express.use(express_1.default.json());
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`Server connected to http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.config.js.map