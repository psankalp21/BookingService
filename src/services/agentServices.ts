import { BookingE } from "../entities/booking.entity";
import { sendEmail } from "../utils/nodemailer";
import * as grpc from '@grpc/grpc-js';
import { GrpcClass } from "../utils/grpc";

const server = new grpc.Server();

export class agentBookingServices extends GrpcClass {

    private service!: any;

    constructor() {
        super('booking.proto', 'booking')
        this.loadService()
    }

    loadService() {
        this.service = new this.package.BookingService("0.0.0.0:7000", grpc.credentials.createInsecure())
    }


    async getAvailableDrivers(booking_id) {
        try {

            const booking = { booking_id: booking_id };

            const data = await new Promise((resolve, reject) => {
                this.service.GetAvailableDrivers(booking, (err, response) => {
                    if (err) {
                        console.log("errorrrr")
                        reject(err);
                    } else {
                        console.log("resolveee")
                        resolve(response);
                    }
                });
            });
            console.log("dataaa",data)

            return data;
        } catch (err) {
            return err;
        }
    }


    async getBookings() {
        const booking = await BookingE.getAllBookings();
        return booking
    }

    async getBookingsByStatus(status) {

        const booking = await BookingE.getBooking({ journey_status: status.journey_status });
        return booking
    }

    async checkDriverAvailability(booking_id, driver_id) {
        const booking = await BookingE.getBookingById(booking_id)
        const journey_date = booking.journey_date
        const existing_booking = await BookingE.getBooking({ driver_id: driver_id, journey_date: journey_date })
        if (existing_booking)
            return false
        else
            return true
    }

    async acceptBooking(payload) {
        if (await this.checkDriverAvailability(payload.booking_id, payload.driver_id)) {
            await BookingE.acceptBooking(payload)
            const booking = await BookingE.completeBookingDetails(payload.booking_id);
            await sendEmail(booking.user_collection.email, "Your Booking has been accepted", `
            Dear ${booking.user_collection.first_name},
            Your booking for ${booking.source} to ${booking.destination} for ${booking.journey_date} has been accepted.
            Your driver is ${booking.driver_collection.name} with contact number: ${booking.driver_collection.phone} . Kindly check your profile for more details
            Thank you`)
        }
        else {
            throw new Error("Driver not available")
        }
    }

    async rejectBooking(booking_id) {
        await BookingE.rejectBooking(booking_id)
    }

    async changeDriver(payload) {
        const booking_id = payload.booking_id;
        const driver_id = payload.driver_id;

        if (await this.checkDriverAvailability(booking_id, driver_id)) {
            await BookingE.changeDriver(booking_id, driver_id)
        }
        else
            throw new Error("Driver not available for selected slot")
    }

    async changeTaxi(payload) {
        const booking_id = payload.booking_id;
        const taxi_id = payload.taxi_id;

        if (await this.checkTaxiAvailability(booking_id, taxi_id))
            await BookingE.changeTaxi(booking_id, taxi_id)
        else
            throw new Error("Taxi not available for selected slot")
    }

    async checkTaxiAvailability(booking_id, taxi_id) {
        const booking = await BookingE.getBookingById(booking_id)
        const journey_date = booking.journey_date
        const existing_booking = await BookingE.getBooking({ taxi_id: taxi_id, journey_date: journey_date })
        if (existing_booking)
            return false
        else
            return true
    }

    // async getAvailableDrivers(booking_id) {
    //     // Make a gRPC call to fetch available drivers
    //     const request = new GetAvailableDriversRequest();
    //     request.setBookingId(booking_id);

    //     return new Promise((resolve, reject) => {
    //         this.bookingClient.getAvailableDrivers(request, (error, response: GetAvailableDriversResponse) => {
    //             if (error) {
    //                 reject(error);
    //             } else {
    //                 const newDrivers = response.getDriversList();
    //                 resolve(newDrivers);
    //             }
    //         });
    //     });
    // }

    // async getAvailableDrivers(booking_id) {

    //     const apiUrl = 'http://localhost:3001/user/get_all_drivers';
    //     const response = await axios.post(apiUrl);
    //     const new_drivers = response.data.Drivers
    //     return new_drivers
    //     // // const booking = await BookingCollection.findById(booking_id);
    //     // // let availableDriver = [];

    //     // // for (const driver of new_drivers) {
    //     // //     const existing_driver = await BookingCollection.findOne({
    //     // //         driver_id: driver._id,
    //     // //         journey_date: {
    //     // //             $gte: new Date(booking.journey_date),
    //     // //             $lte: new Date(booking.journey_date)
    //     // //         },
    //     // //     });
    //     // //     if (!existing_driver)
    //     // //         availableDriver.push({ "id": driver._id, "Name": driver.name, "email": driver.email });
    //     // // }
    //     // // return availableDriver;
    // }


}