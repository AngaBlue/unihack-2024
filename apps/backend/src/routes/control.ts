import { Request, Response, Router } from "express";

export const controllerRouter = Router();

// Implement controller (front-end) relevant endpoints
controllerRouter.get("/test", (req: Request, res: Response) => {
    res.send("Test success!");
});