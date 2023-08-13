import Workspace from "./workspace.interface";
import workspaceModel from "./workspace.model";

class WorkspaceService {
    public workspaceModel = workspaceModel;

    public createWorkspace = async (
        title: string,
        description: string
    ): Promise<Workspace | Error> => {
        try {
            const workspace = await this.workspaceModel.create({
                title,
                description,
            });

            return workspace;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    public getAllWorkspaces = async (): Promise<Workspace[] | Error> => {
        try {
            const workspaces = await this.workspaceModel.find().exec();

            return workspaces;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    public fetchWorkspaceById = async (
        workspaceId: string
    ): Promise<Workspace | Error> => {
        try {
            const workspace = await this.workspaceModel
                .findById(workspaceId)
                .exec();

            if (!workspace) {
                throw new Error(`A workspace <${workspaceId} does not found> `);
            }
            return workspace;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    public updateWorkspace = async (
        workspaceId: string,
        newWorkspace: Partial<Workspace>
    ): Promise<Workspace | Error> => {
        try {
            const updatedWorkspace = await this.workspaceModel
                .findByIdAndUpdate(workspaceId, newWorkspace, { new: true })
                .exec();

            return updatedWorkspace;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    public deleteWorkspace = async(workspaceId: string): Promise<void> => {
        try {
            await this.workspaceModel.findByIdAndDelete(workspaceId);
        } catch (error) {
            throw new Error(error.message);
        }
    } 
}

export default WorkspaceService;
