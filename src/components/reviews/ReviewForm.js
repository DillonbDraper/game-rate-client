import React, { useContext, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { ReviewContext } from "./ReviewProvider"

export const ReviewForm = props => {
    const history = useHistory()
    const params = useParams()
    const { createReview } = useContext(ReviewContext)

    const [currentReview, setCurrentReview] = useState({
        body: ''
    })

    const changeReviewState = (domEvent) => {
        const newReviewState = Object.assign({}, currentGame)
        newReviewState[domEvent.target.name] = domEvent.target.value
        setCurrentReview(newReviewState)
    }

    return (
        <form className="reviewForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="body">Input review body here: </label>
                    <input type="textarea" name="title" required autoFocus className="form-control"
                        value={currentReview.body}
                        onChange={changeReviewState}
                    />
                    <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const review = {
                        body: currentReview.body,
                        player: localStorage.getItem('lu_token'),
                        game: params.gameId
                    }

                    // Send POST request to your API
                    createReview(review)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>

                    </div>
                    </fieldset>

        </form>
    )


}