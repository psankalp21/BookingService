import { Request, Response } from 'express';
import { userBookingServices } from '../services/userBooking.services';

const userServices = new userBookingServices()

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
        const id:object = req.query.id;
        try {
            await userServices.cancelBooking(id);
            res.send("Booking canceled")
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

    async getBooking(req: Request, res: Response) {
        const booking_id:object = req.query.booking_idid;
        try {
            const booking = await userServices.getBooking(booking_id);
            res.send({"Message":booking})
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
            res.send({"Message":bookings})
        }
        catch (e) {
            console.log(e);
            res.send({ "Error: ": e.message });
        }
    }

}