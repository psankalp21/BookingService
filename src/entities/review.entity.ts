import mongoose from "mongoose";
import BaseEntity from "./base.entity";
import ReviewCollection from "../database/models/review.model";

class ReviewEntity extends BaseEntity {
    constructor() {
        super(ReviewCollection);
    }
    async addReview(payload) {
        return await this.create(payload)
    }
    async getReviewById(id: string) {
        return await this.findById(id)
    }
    async getReview(condition) {
        return await this.findOne(condition)
    }
    async getAllReviews(condition = {}) {
        return await this.find(condition)
    }
    async editReview(payload)
    {
        return this.updateOne(payload.booking_id,payload.update)
    }
}

export const ReviewE = new ReviewEntity();


