import { GameProvider } from "./game/GameProvider.js"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameDetail } from "./game/GameDetail.js"


export const AppViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <Route exact path="/" >
                    <GameList />
                </Route>

                <Route exact path="/games/:gameId(\d+)" render={
                                    props =>
                                        <GameDetail {...props} />
                                } />
            </GameProvider>
        </main>
    </>
}