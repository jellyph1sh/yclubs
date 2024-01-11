import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Explore from "../pages/Explore/Explore";
import Events from "../pages/Events/Events";

const Ways = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="*" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
    );
}

export default Ways