import { GameProvider } from "./game/GameProvider.js"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameDetail } from "./game/GameDetail.js"
import { CategoryProvider } from "./categories/CategoryProvider.js"
import { GameForm } from "./game/GameForm.js"


export const AppViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <CategoryProvider>
                    <Route exact path="/" >
                        <GameList />
                    </Route>

                    <Route exact path="/games/:gameId(\d+)" render={
                        props =>
                            <GameDetail {...props} />
                    } />
                    <Route exact path="/games/new" >
                        <GameForm />
                    </Route>
                </CategoryProvider>
            </GameProvider>
        </main>
    </>
}