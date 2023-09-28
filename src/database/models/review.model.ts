import mongoose, { Document, Schema, Types } from 'mongoose';

interface Review extends Document {
  booking_id: Types.ObjectId;
  taxi_rating: number;
  driver_rating: number;
  journey_rating: number;
  comment?:string;
}

const reviewSchema = new Schema<Review>({
  booking_id: {
    type: Schema.Types.ObjectId, 
    ref: 'booking_collections',
  },
  taxi_rating:  { type: Number, required: true },
  driver_rating:  { type: Number, required: true },
  journey_rating: { type: Number, required: true },
  comment: { type: String, required: false },
},
  {
    timestamps: true,
  }
);

const ReviewCollection = mongoose.model<Review>('review_collections', reviewSchema);

export default ReviewCollection;
