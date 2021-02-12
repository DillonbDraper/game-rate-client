import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'
import { CategoryContext } from "../categories/CategoryProvider.js"


export const GameForm = props => {
    const history = useHistory()
    const { createGame } = useContext(GameContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const playerNumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] 
    const esrbRatings = ['eC, E, E10+, T, M, Ao']

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
        length_to_beat: "00:00:00",
        esrb: "",
        category: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getCategories()
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
    }

    return (
        <form className="gameForm">
            {props.match.params.gameId ? <h2 className="gameForm__title">Edit Game</h2>: <h2 className="gameForm__title">Register New Game</h2>}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                    <label htmlFor="title">Designer: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                    <label htmlFor="title">Release year: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.release_year}
                        onChange={changeGameState}
                    />
                    <h3>Number of Players: </h3>
                    <select name="num_of_players" value={currentGame.num_of_players} onChange={changeGameState}>
                        {playerNumArray.map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                    <h3>Game Type:</h3>
                    <select name="gameTypeId" onChange={changeGameState} value={currentGame.esrb}>
                        <option value="0">Please select an option</option>
                        {esrbRatings.map(rating => <option key={rating} value={rating}>{rating}</option>)}
                    </select>
                    <select name="gameCategory" onChange={changeGameState} value={currentGame.category}>
                        <option value="0">Please select an option</option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}
                    </select>
                </div>
            </fieldset>

            { props.match.params.gameId ? 
            <button type="submit"
            onClick={evt => {
                evt.preventDefault()

                const game = {
                    id: parseInt(props.match.params.gameId),
                    maker: currentGame.maker,
                    title: currentGame.title,
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    skillLevel: parseInt(currentGame.skillLevel),
                    gameTypeId: parseInt(currentGame.gameTypeId),
                }

                // Send PUT request to your API
                editGame(game)
                    .then(() => history.push("/"))
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
                        num_of_players: parseInt(currentGame.num_of_players),
                        length_to_beat: currentGame.length_to_beat,
                        esrb: currentGame.esrb,
                        category: currentGame.category
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