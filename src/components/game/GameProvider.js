import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [games, setGames] = useState([])
    const [game, setGame] = useState({categories: [{}]})


    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game),
        }).then(getGames)
    }

    const editGame = game => {
        return fetch(`http://localhost:8000/games/${game.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game),
        }).then(getGames)
    }

    const getGameById = gameId => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGame)
    }

    const rateGame = rating => {
        return fetch(`http://localhost:8000/ratings`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rating),
        }).then(getGameById(rating.game))

        
    }

    return (
        <GameContext.Provider value={{ games, getGames, createGame, getGameById, game, editGame, rateGame }} >
            { props.children}
        </GameContext.Provider>
    )
}