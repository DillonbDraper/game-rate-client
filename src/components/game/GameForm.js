import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import { CategoryContext } from "../categories/CategoryProvider.js"


export const GameForm = props => {
    const history = useHistory()
    const params = useParams()
    const { createGame } = useContext(GameContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const playerNumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] 
    const esrbRatings = ['eC', 'E', 'E10+', 'T', 'M', 'Ao']

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        release_year: 0,
        num_of_players: 0,
        time_to_beat: "00:00:00",
        esrb_rating: "",
        category: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getCategories().then(() => {
            console.log(categories)
        })
    }, [])

    // useEffect(() => {
    //     if (props.match.params.gameId) {
    //         getGame(props.match.params.gameId).then(() => {
    //             setCurrentGame({
    //                 skillLevel: game.skill_level,
    //                 numberOfPlayers: game.number_of_players,
    //                 title: game.title,
    //                 maker: game.maker,
    //                 gameTypeId: game.gametype.id
    //             })
    //         })
    //     }
    // }, [props.match.params.gameId])

    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const changeGameState = (domEvent) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGameState)
        console.log(currentGame)
    }

    return (
        <form className="gameForm">
            {params.gameId ? <h2 className="gameForm__title">Edit Game</h2>: <h2 className="gameForm__title">Register New Game</h2>}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                    <label htmlFor="release_year">Release year: </label>
                    <input type="text" name="release_year" required autoFocus className="form-control"
                        value={currentGame.release_year}
                        onChange={changeGameState}
                    />
                    <label htmlFor="time_to_beat">Game Length: </label>
                    <input type="text" name="time_to_beat" default="00:00:00" required autoFocus className="form-control"
                        value={currentGame.time_to_beat}
                        onChange={changeGameState}
                    />
                    <h3>Number of Players: </h3>
                    <select name="num_of_players" value={currentGame.num_of_players} onChange={changeGameState}>
                        {playerNumArray.map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                    <h3>Game Rating:</h3>
                    <select name="esrb_rating" onChange={changeGameState} value={currentGame.esrb}>
                        <option value="0">Please select an option</option>
                        {esrbRatings.map(rating => <option key={rating} value={rating}>{rating}</option>)}
                    </select>
                    <h3>Game Type:</h3>
                    <select name="category" onChange={changeGameState} value={currentGame.category}>
                        <option value="0">Please select an option</option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}
                    </select>
                </div>
            </fieldset>

            { params.gameId ? 
            <button type="submit"
            onClick={evt => {
                evt.preventDefault()

                const game = {
                    id: parseInt(params.gameId),
                    maker: currentGame.maker,
                    title: currentGame.title,
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    skillLevel: parseInt(currentGame.skillLevel),
                    gameTypeId: parseInt(currentGame.gameTypeId),
                }

                // Send PUT request to your API
                // editGame(game)
                //     .then(() => history.push("/"))
            }}
            className="btn btn-primary">Edit</button>
            :
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        designer: currentGame.designer,
                        description: currentGame.description,
                        release_year: parseInt(currentGame.release_year),
                        num_of_players: parseInt(currentGame.num_of_players),
                        time_to_beat: currentGame.time_to_beat,
                        esrb_rating: currentGame.esrb_rating,
                        category: parseInt(currentGame.category)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
            }
        </form>
    )
}