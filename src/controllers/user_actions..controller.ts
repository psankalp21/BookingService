import { Request, Response } from 'express';
import { userBookingServices } from '../services/userServices';
import { review_services } from '../services/review.services';

const userServices = new userBookingServices()
const reviewServices = new review_services()

export class user_booking_controller {
    async addBooking(req: Request, res: Response) {
        const payload = req.body;
        try {
            await userServices.addBooking(payload);
            res.send("Booking added")
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async cancelBooking(req: Request, res: Response) {
        const id: object = req.query.id;
        try {
            await userServices.cancelBooking(id);
            res.send("Booking canceled")
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async getBookingById(req: Request, res: Response) {
        const booking_id: object = req.query.booking_id;
        try {
            const booking = await userServices.getBooking(booking_id);
            res.send({ "Message": booking })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async vieMyBookings(req: Request, res: Response) {
        try {
            const user_id = req.headers.uid
            const bookings = await userServices.getBookingsByUserId(user_id);
            res.send({ "Message": bookings })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }


    async addReview(req: Request, res: Response) {
        try {
            const payload = req.body
            const bookings = await reviewServices.addReview(payload);
            res.send({ "Message": bookings })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async editReview(req: Request, res: Response) {
        try {
            const payload = req.body
            await reviewServices.editReview(payload);
            res.send({ "Message": "Review Updated" })
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    // async getMyReviews(req: Request, res: Response) {
    //     try {
    //         const user_id = req.headers.uid
    //         await reviewServices.getReviews(c);
    //         res.send({ "Message": "Review Updated" })
    //     }
    //     catch (e) {
    //         console.log(e);
    //         res.send({ "Error: ": e.message });
    //     }
    // }

}