import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { Link } from 'react-router-dom'


export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <Link to={`/games/${game.id}`}>{game.title}</Link>


                        
                    </section>
                })
            }
            {/* <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button> */}
        </article>
    )
}