import express, { Router } from 'express';
import { agent_booking_controller } from '../controllers/agent_actions.controller';
import { verifyToken } from '../middlewares/jwt';

const agentController = new agent_booking_controller();

const router: Router = express.Router();
router.get('/get_bookings', verifyToken,agentController.getBookings);
router.post('/accept_booking',agentController.acceptBooking);
router.post('/reject_booking',agentController.rejectBooking);
router.get('/get_all_drivers',agentController.getAvailableDrivers);

router.get('/get_booking_by_status',agentController.getBookingsByStatus);
router.patch('/change_driver',agentController.changeDriver);
router.patch('/change_taxi',agentController.changeTaxi);
router.get('/get_review_by_id',agentController.getReviewById);
router.get('/get_booking_review',agentController.getBookingsReview);


export default router;
