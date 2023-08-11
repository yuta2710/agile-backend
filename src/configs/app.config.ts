import express, { Application } from "express";
import mongoose from "mongoose";
import colors from "colors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import Controller from "@/utils/interfaces/controller.interface";
import { errorResponseMiddleware } from "../middleware/error.middleware";

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number){ 
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeErrorHandlers();
        this.initializeGeneralMiddleware();
        this.initializeControllers(controllers);
    }

    private initializeDatabaseConnection = async(): Promise<void> => {
        try{
            const { MONGO_URI } = process.env;
            console.log(MONGO_URI);
            await mongoose.connect(MONGO_URI);
            console.log(colors.green.bold("Database connected successfully"));
        } 
        catch(error){
            throw new Error(`Failed to connected MongoDB`);
        }
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.map(controller => (
            this.express.use(`api/${process.env.API_VERSION_1}`, controller.router)
        ));
    }

    private initializeErrorHandlers(): void{
        this.express.use(errorResponseMiddleware);
    }

    private initializeGeneralMiddleware(): void {
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(morgan("dev"));
        this.express.use(compression());
        this.express.use(cookieParser());
        this.express.use(express.json());
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`Server connected to http://localhost:${this.port}`);
        })
    }
}

export default App;