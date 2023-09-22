import mongoose from "mongoose";
import BookingCollection from "../database/models/booking.model";
import BaseEntity from "./base.entity";

class BookingEntity extends BaseEntity {
    constructor() {
        super(BookingCollection);
    }

    async getBookingById(id: string) {
        return await this.findById(id)
    }

    async getBooking(condition) {
        return await this.findOne(condition)
    }

    async addBooking(payload) {
        return await this.create(payload)
    }

    async getAllBookings(condition?) {
        if (condition)
            return await this.find(condition)
        else
            return await this.find()

    }

    async cancelBooking(id) {
        const update = {
            booking_status: 'cancelled'
        }
        return await this.findByIdAndUpdate(id, update)
    }

    // async acceptBooking(payload) {
    //     const update = {
    //         driver_id: payload.driver_id,
    //         booking_status: 'accepted'
    //     };
    //     return await this.findByIdAndUpdate(payload.booking_id, update);
    // }

    async acceptBooking(payload) {
        const update = {
            driver_id: payload.driver_id,
            booking_status: 'accepted'
        };

        await this.updateOne(payload.booking_id, update)

        const booking = await BookingCollection.aggregate([
            {
              $match: { _id: new mongoose.Types.ObjectId(payload.booking_id) },
            },
            {
              $lookup: {
                from: 'user_collections',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_collection',
              },
            },
            {
              $unwind: '$user_collection',
            },
            {
              $lookup: {
                from: 'driver_collections',
                localField: 'driver_id',
                foreignField: '_id',
                as: 'driver_collection',
              },
            },
            {
              $unwind: '$driver_collection',
            },
          ]);

        return booking[0]
    }

    async changeDriver(booking_id, driver_id) {
        const update = {
            driver_id: driver_id,
        };

        return await this.findByIdAndUpdate(booking_id, update);
    }

    async changeTaxi(booking_id, taxi_id) {
        const update = {
            taxi_id: taxi_id,
        };

        return await this.findByIdAndUpdate(booking_id, update);
    }

    async rejectBooking(booking_id) {
        const update = {
            booking_status: 'rejected'
        }

        return await this.findByIdAndUpdate(booking_id, update);
    }

    async getBookingsWithStatus(status) {
        const condition = {
            booking_status: status
        }
        return await this.find(condition);
    }
}

export const BookingE = new BookingEntity();


