// Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ChatRoom from "../Pages/ChatRoom/ChatRoom";
import Artists from "../Pages/Artists/Artists";

const RouterConfig = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/artists/:genre"} element={<Artists />} />
                <Route path={"/chat"} element={<ChatRoom />} />
                <Route path="*" element={<Navigate to={`/`} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterConfig;
