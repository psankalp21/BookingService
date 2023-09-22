import { BookingE } from "../entities/booking.entity";

export class userBookingServices {
    async addBooking(payload) {
        payload.booking_status = "pending";
        const booking = await BookingE.addBooking(payload);
        return booking
    }

    async cancelBooking(booking_id) {
        const booking = await BookingE.cancelBooking(booking_id);
        return booking
    }

    async getBooking(booking_id) {
        const booking = await BookingE.getBookingById(booking_id);
        return booking
    }

    async getBookingsByUserId(user_id) {
        const booking = await BookingE.getAllBookings(user_id);
        return booking
    }


}