import React, { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GameContext } from "./GameProvider"

export const GameDetail = (props) => {
    const { game, getGame } = useContext(GameContext)
    const history = useHistory()
    const params = useParams()


    useEffect(() => {
        getGame(params.gameId)
    }, [])






    return (
        <section className="game_details">
            <div className="game__title">{game.title} by {game.designer}</div>
            <div className="game__description">Description: {game.description}</div>
            <div className="game__players">It is a {game.num_of_players} player game</div>
            <div className="game__skillLevel">Released in {game.release_year}</div>
            <div className="game__length">{game.title} is approximately {game.time_to_beat} long</div>
            <div className="game__content">It is rated {game.esrb_rating} by the ESRB</div>
            <div className="game__categories">Game is found in following categories: {game.categories[0].label} </div>

            <button className="btn btn-3"
                onClick={() => history.push(`/`)}
            >Return to all games</button>

            <button className="btn btn-3"
                onClick={() => history.push(`games/${params.gameId}/review`)}
            >Review Game</button>
        </section>

    )
}

