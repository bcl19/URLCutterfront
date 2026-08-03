import {Route,Routes} from "react-router-dom"
import { InitialPage }from "@/page/layout"
export const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<InitialPage/>} />
            <Route path="/" element={<InitialPage/>} />
            <Route path="/" element={<InitialPage/>} />
            <Route path="/" element={<InitialPage/>} />
            <Route path="/" element={<InitialPage/>} />
        </Routes>
    )
}