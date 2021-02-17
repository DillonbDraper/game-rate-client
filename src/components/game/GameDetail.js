import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ReviewList } from '../reviews/ReviewList'
import { GameContext } from "./GameProvider"

export const GameDetail = (props) => {
    const { game, getGameById, rateGame } = useContext(GameContext)
    const [ currentRating, setCurrentRating ] = useState(0)
    const history = useHistory()
    const params = useParams()
    const ratingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    useEffect(() => {
        getGameById(params.gameId)
    }, [])

    const changeRatingState = (domEvent) => {
        const newRatingState = Object.assign({}, currentRating)
        newRatingState[domEvent.target.name] = domEvent.target.value
        setCurrentRating(parseInt(newRatingState.rating))
    }




    return (
        <section className="game_details">
            <div className="game__title">{game.title} by {game.designer}</div>
            <div className="game__description">Description: {game.description}</div>
            <div className="game__players">It is a {game.num_of_players} player game</div>
            <div className="game__skillLevel">Released in {game.release_year}</div>
            <div className="game__length">{game.title} is approximately {game.time_to_beat} long</div>
            <div className="game__content">It is rated {game.esrb_rating} by the ESRB</div>
            <div className="game__categories">Game is found in following categories: {game.categories[0].label} </div>
            <div className="game__average__rating">Average score: {game.average_rating}</div>

            <h2 className="ratings">Rate this game: </h2>
            <form>
                <fieldset>
                    <select name="rating" onChange={changeRatingState} value={currentRating}>
                        <option value="0">Please select an option</option>
                        {ratingArray.map(rating => <option key={rating} value={rating}>{rating}</option>)}
                    </select>
                </fieldset>

                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()

                        const theRating = {
                            rating: currentRating,
                            game: +(params.gameId)
                        }

                        console.log(theRating)
                        rateGame(theRating)

                    }}>Submit Rating</button>
            </form>
            <button className="btn btn-3"
                onClick={() => history.push(`/`)}
            >Return to all games</button>

            <div className="game_reviews">
                <ReviewList gameId={params.gameId} />
            </div>

            <button className="btn btn-3"
                onClick={() => history.push(`/games/${params.gameId}/review`)}
            >Review Game</button>
        </section>

    )
}

