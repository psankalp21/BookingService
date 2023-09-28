import { Request, Response } from 'express';
import { agentBookingServices } from '../services/agentServices';
import { review_services } from '../services/review.services';

const agentServices = new agentBookingServices()
const reviewServices = new review_services()

export class agent_booking_controller {
    async getBookings(req: Request, res: Response) {
        try {
            const bookings = await agentServices.getBookings();
            res.send({ "Bookings: ": bookings });
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
    async getBookingsByStatus(req: Request, res: Response) {
        try {
            const booking_status = req.query.status;
            const bookings = await agentServices.getBookingsByStatus(booking_status)
            res.send({ "Bookings: ": bookings });
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
    async acceptBooking(req: Request, res: Response) {
        try {
            const payload = req.body
            await agentServices.acceptBooking(payload)
    
            res.send({ "Message": "Booking Accepted" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
    async rejectBooking(req: Request, res: Response) {
        try {
            const booking_id = req.query.booking_id
            await agentServices.rejectBooking(booking_id)
            res.send({ "Message": "Booking Reject" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
    async changeDriver(req: Request, res: Response) {
        try {
            const payload = req.body

            await agentServices.changeDriver(payload)
            res.send({ "Message": "Driver Updated" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
    async changeTaxi(req: Request, res: Response) {
        try {
            const payload = req.body


            await agentServices.changeTaxi(payload)
            res.send({ "Message": "Taxi Updated" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }
    async getAvailableDrivers(req: Request, res: Response) {
        try {
            const booking_id = req.query.booking_id
            const drivers = await agentServices.getAvailableDrivers(booking_id)
            res.send({ "drivers": drivers })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async getReviewById(req: Request, res: Response) {
        try {
            const review_id = req.query.review_id
            const review = await reviewServices.getReviewById(review_id)
            res.send({ "review": review })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async getBookingsReview(req: Request, res: Response) {
        try {
            const booking_id = req.query.booking_id
            const review = await reviewServices.getReviews({booking_id:booking_id})
            res.send({ "reviews": review })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

}