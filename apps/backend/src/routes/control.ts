import express, { Request, Response, Router } from "express";
import { globalState } from "../state/state";

export const controllerRouter = Router();

// Note that all JSON bodies
controllerRouter.use(express.json());

// Implement controller (front-end) relevant endpoints
controllerRouter.get("/checktoken", (req: Request, res: Response) => {
    if(globalState.sessions.has(req.body.token)){
        res.status(200).send("Valid");
    } else {
        res.status(403).send("Invalid");
    }
});

controllerRouter.get("/frames", (req: Request, res: Response) => {
    // Obtain the last 100 frames
});