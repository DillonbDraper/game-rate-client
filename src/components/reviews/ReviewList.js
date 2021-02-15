import React, { useContext, useEffect } from "react"
import { ReviewContext } from "./ReviewProvider.js"

export const ReviewList = props => {
    const { getCorrespondingReviews, reviews } = useContext(ReviewContext)
    const [ reviewSet, setReviewSet ] = useState([])


    useEffect(getCorrespondingReviews(props.gameId)).then(setReviewSet), [])

    return (
        reviewSet.map(review => {
            <section className="reviews">
            <p className="reviewAuthor">Review by: {review.user_id}</p>
            <p className="reviewText">{review.body}</p>
            </section>
        })
    )
}