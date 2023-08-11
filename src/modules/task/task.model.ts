/**
 * id: A unique identifier for the task.
title: The title or name of the task.
description: A description or details about the task.
assignedTo: The user or team assigned to the task.
dueDate: The deadline or due date for completing the task.
priority: The priority level of the task (e.g., high, medium, low).
status: The current status of the task (e.g., incomplete, in progress, completed).
createdAt: The date and time when the task was created.
updatedAt: The date and time when the task was last updated.

 */

import mongoose, { Schema, model } from "mongoose";
import Task from "./task.interface";

const TaskModel = new mongoose.Schema({
    title: {
        type: String, 
        required: true 
    }, 
    description: {
        type: String, 
        required: true 
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        required: true 
    },
    dueDate: {
        type: Date,
        required: true 
    },
    priority: {
        type: String, 
        default: "medium", 
        enum: ["low", "medium", "high"],
        required: true 
    } ,
    status: {
        type: String, 
        required: true, 
        default: "Not Started", 
    }
})

export default model<Task>("Task", TaskModel);