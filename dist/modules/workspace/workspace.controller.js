"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workspace_service_1 = __importDefault(require("./workspace.service"));
const error_exeptions_1 = __importDefault(require("../../utils/exceptions/error.exeptions"));
class WorkspaceController {
    path = "/workspaces";
    router = (0, express_1.Router)();
    service = new workspace_service_1.default();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes = async () => {
        this.router.route(`${this.path}`).get(this.getWorkspaces).post(this.createWorkspace);
        this.router.route(`${this.path}/:id`).get(this.getWorkspace);
    };
    createWorkspace = async (req, res, next) => {
        try {
            const { title, description } = req.body;
            const workspace = await this.service.createWorkspace(title, description);
            res.status(201).json({ success: true, workspace });
        }
        catch (error) {
            next(new error_exeptions_1.default(400, `Unable to create this workspace`));
        }
    };
    getWorkspaces = async (req, res, next) => {
        try {
            const workspaces = await this.service.getAllWorkspaces();
            res.status(200).json(workspaces);
        }
        catch (error) {
            next(new error_exeptions_1.default(400, `Unable to get this workspaces`));
        }
    };
    getWorkspace = async (req, res, next) => {
        try {
            const workspace = await this.service.fetchWorkspaceById(req.params.id);
            res.status(200).json({ success: true, workspace });
        }
        catch (error) {
            next(new error_exeptions_1.default(400, `Unable to get this workspace`));
        }
    };
}
exports.default = WorkspaceController;
//# sourceMappingURL=workspace.controller.js.map