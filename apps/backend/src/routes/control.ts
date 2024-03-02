import { json, Request, Response, Router } from "express";
import { InstructarSession, globalState } from "../state/state";

export const controllerRouter = Router();

// Note that all JSON bodies
controllerRouter.use(json());

// Implement controller (front-end) relevant endpoints
controllerRouter.get("/checktoken", (req: Request, res: Response) => {
    if(globalState.retrieveSession(req.body.token) !== null){
        res.status(200).send("Valid token");
    } else {
        res.status(403).send("Invalid token");
    }
});

controllerRouter.get("/frame", (req: Request, res: Response) => {
    // Obtain the last frame
    let session: InstructarSession | null = globalState.retrieveSession(req.body.token);
    if (session === null){
        res.status(403).send("Invalid token");
        return;
    }
    
    if (session.frame === null) {
        res.status(404).send("No frame (currently)");
        return;
    }

    let [ frameId, framePayload ] = session.frame;

    res.json({
        frameId,
        framePayload
    }).send();
});
