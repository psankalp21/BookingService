import mongoose, { Document, Schema, Types } from 'mongoose';

enum BookingStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
  Canceled = "canceled",
}

export interface Booking extends Document {
  user_id: Types.ObjectId;
  taxi_id?: object;
  driver_id?: Types.ObjectId; // Ensure consistent type definition
  source: string;
  destination: string;
  distance?: string;
  duration?: string;
  journey_date: Date;
  booking_status: BookingStatus;
}

const bookingSchema = new Schema<Booking>({
  user_id: {
    type: Schema.Types.ObjectId, 
    ref: 'user_collections',
  },
  taxi_id: { type: Object, required: false },
  driver_id: Types.ObjectId ,
  source: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: String, required: false },
  duration: { type: String, required: false },
  journey_date: { type: Date, required: true },
  booking_status: { type: String, enum: Object.values(BookingStatus), required: true },
});

const BookingCollection = mongoose.model<Booking>('booking_collections', bookingSchema);

export default BookingCollection;
