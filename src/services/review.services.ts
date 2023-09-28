import { ReviewE } from "../entities/review.entity";

export class review_services {
    async addReview(payload) {
        const review = await ReviewE.getReview({ booking_id: payload.booking_id })
        if (review.length)
            throw new Error("Review already exists for selected booking")
        await ReviewE.addReview(payload);
    }

    async getReviewById(id) {
        const review = await ReviewE.getReviewById(id)
        return review
    }

    async getReviews(condition) {
        const review = await ReviewE.getAllReviews(condition)
        return review
    }

    async editReview(payload) {
        const review = await ReviewE.getReview(payload.condition)
        if (!review)
            throw new Error("Review Not Found")
        const currentDate = new Date();
        const createdAtDate = new Date(review.createdAt);
        const timeDifference = (currentDate.getTime() - createdAtDate.getTime()) / (1000 * 3600);
        console.log("time diff", timeDifference)
        if (timeDifference > 24)
            throw new Error("You can not edit reviews after 24 hours")
        await ReviewE.editReview(payload);
    }
}