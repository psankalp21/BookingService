import express, { Router } from 'express';
import agent from './agent.routes';
import user from './user.routes';


const router: Router = express.Router();
router.use('/bookings', agent,user);

export default router;
