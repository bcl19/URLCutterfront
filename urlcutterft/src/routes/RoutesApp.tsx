import {Route,Routes} from "react-router-dom"
import { InitialPage }from "@/pages/layout"
export const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<InitialPage/>} />
        </Routes>
    )
}