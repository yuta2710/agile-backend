import mongoose, { model } from "mongoose";
import Workspace from "./workspace.interface";

const WorkspaceSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true 
    },
    description: {
        type: String,
    }
})

export default model<Workspace>("Workspace", WorkspaceSchema);