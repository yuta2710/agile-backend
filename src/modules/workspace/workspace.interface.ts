import { Document } from "mongoose";

export default interface Workspace extends Document {
    title: string;
    description: string;
}