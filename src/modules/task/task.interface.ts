import { Document } from "mongoose";

export default interface Task extends Document {
    title: String;
    description: String;
    assignedTo: String;
    dueDate: String;
    priority: String;
    status: String;
}