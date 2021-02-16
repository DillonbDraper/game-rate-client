import { GameProvider } from "./game/GameProvider.js"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameDetail } from "./game/GameDetail.js"
import { CategoryProvider } from "./categories/CategoryProvider.js"
import { GameForm } from "./game/GameForm.js"
import { ReviewForm } from "./reviews/ReviewForm"
import { ReviewProvider } from "./reviews/ReviewProvider"


export const AppViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <CategoryProvider>
                    <ReviewProvider>
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
                        <Route exact path="/games/:gameId(\d+)/review" render={
                            props =>
                                <ReviewForm {...props} />
                        } />
                    </ReviewProvider>
                </CategoryProvider>
            </GameProvider>
    </main>
    </>
}