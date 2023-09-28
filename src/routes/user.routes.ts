import express, { Router } from 'express';
import { user_booking_controller } from '../controllers/user_actions..controller';
import { verifyToken } from '../middlewares/jwt';

const userController = new user_booking_controller();

const router: Router = express.Router();
router.post('/add_booking',userController.addBooking);
router.patch('/cancel_booking', userController.cancelBooking);
router.post('/add_review', userController.addReview);
router.patch('/edit_review', userController.editReview);

export default router;
