import { GameProvider } from "./game/GameProvider.js"
import { Route } from "react-router-dom"


export const AppViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <Route exact path="/" />
            </GameProvider>
        </main>
    </>
}