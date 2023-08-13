import { NextFunction, Request, Response, Router } from "express";
import WorkspaceService from "./workspace.service";
import ErrorResponse from "../../utils/exceptions/error.exeptions";

class WorkspaceController {
    public path: string = "/workspaces";
    public router: Router = Router();
    public service: WorkspaceService = new WorkspaceService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async (): Promise<Response | void> => {
        this.router
            .route(`${this.path}`)
            .get(this.getWorkspaces)
            .post(this.createWorkspace);

        this.router
            .route(`${this.path}/:id`)
            .get(this.getWorkspace)
            .put(this.updateWorkspace)
            .delete(this.deleteWorkspace);
    };

    private createWorkspace = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, description } = req.body;
            const workspace = await this.service.createWorkspace(
                title,
                description
            );

            res.status(201).json({ success: true, workspace });
        } catch (error) {
            next(new ErrorResponse(400, `Unable to create this workspace`));
        }
    };

    private getWorkspaces = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const workspaces = await this.service.getAllWorkspaces();

            res.status(200).json(workspaces);
        } catch (error) {
            next(new ErrorResponse(400, `Unable to get this workspaces`));
        }
    };

    private getWorkspace = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const workspace = await this.service.fetchWorkspaceById(
                req.params.id
            );

            res.status(200).json({ success: true, workspace });
        } catch (error) {
            next(new ErrorResponse(400, `Unable to get this workspace`));
        }
    };

    private updateWorkspace = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const updatedWorkspace = await this.service.updateWorkspace(
                req.params.id,
                req.body
            );

            res.status(200).json({
                success: true,
                data: updatedWorkspace,
            });
        } catch (error) {
            next(new ErrorResponse(400, `Unable to update this workspace`));
        }
    };

    private deleteWorkspace = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            await this.service.deleteWorkspace(req.params.id);

            res.status(200).json({
                success: true,
                data: {}
            })
        } catch (error) {
            next(new ErrorResponse(400, `Unable to update this workspace`));
        }
    };
}

export default WorkspaceController;
