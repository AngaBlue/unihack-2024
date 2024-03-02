import express, { Router } from 'express';
import state from '../state/state';

export const router = Router();

// Note that all JSON bodies
router.use(express.json());

// Implement controller (front-end) relevant endpoints
router.get('/checktoken', (req, res) => {
    if (state.sessions.has(req.body.token)) {
        res.status(200).send('Valid');
    } else {
        res.status(403).send('Invalid');
    }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/frames', (req, res) => {
    // Obtain the last 100 frames
});

export default router;
