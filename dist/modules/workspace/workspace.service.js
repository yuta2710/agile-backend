"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_model_1 = __importDefault(require("./workspace.model"));
class WorkspaceService {
    workspaceModel = workspace_model_1.default;
    createWorkspace = async (title, description) => {
        try {
            const workspace = await this.workspaceModel.create({ title, description });
            return workspace;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    getAllWorkspaces = async () => {
        try {
            const workspaces = await this.workspaceModel.find().exec();
            return workspaces;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    fetchWorkspaceById = async (workspaceId) => {
        try {
            const workspace = await this.workspaceModel.findById(workspaceId).exec();
            if (!workspace) {
                throw new Error(`A workspace <${workspaceId} does not found> `);
            }
            return workspace;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
}
exports.default = WorkspaceService;
//# sourceMappingURL=workspace.service.js.map