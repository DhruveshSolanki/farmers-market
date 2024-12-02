import { Route, Routes, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import FarmerHome from "./components/FarmerHome"
import Login from "./components/Login"

const MainRouter = () => {
    const location = useLocation();

    return (
        <div>
            {
                location.pathname !== "/login" && <Header />
            }
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/farmerhome" element={<FarmerHome />} />
            </Routes>
        </div>
    )
}
export default MainRouter