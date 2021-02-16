import React, { useContext, useEffect, useState } from "react"
import { ReviewContext } from "./ReviewProvider.js"

export const ReviewList = props => {
    const { getCorrespondingReviews, reviews } = useContext(ReviewContext)


    useEffect(() => {
        getCorrespondingReviews(props.gameId)
    }, [])

    return (
        <>
        <h1>I am here</h1>
        {reviews.map(review => {
           return <section key={review.id} className="review">
            <p className="reviewAuthor">Review by: {review.user}</p>
            <p className="reviewText">{review.body}</p>
            </section>
        })}
        </>
    )
}