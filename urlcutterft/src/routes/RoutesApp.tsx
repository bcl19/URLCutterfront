import {Route,Routes} from "react-router-dom"
import { InitialPage }from "@/page/layout"
import { ResultPage } from "@/components/atoms/result/result"
export const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<InitialPage/>} />
            <Route path="/result" element={<ResultPage/>} />
            </Routes>
    )
}