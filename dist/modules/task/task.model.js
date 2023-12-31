"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const TaskModel = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    },
    status: {
        type: String,
        required: true,
        default: "Not Started",
    }
});
exports.default = (0, mongoose_1.model)("Task", TaskModel);
//# sourceMappingURL=task.model.js.map