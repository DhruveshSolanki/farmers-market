import { Route, Routes, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Home from "../components/Home"
import FarmerHome from "../components/FarmerHome"
import Login from "../components/Login"
import RegisterUser from "../components/RegisterUser"
import Contact from "../components/Contact"
import About from "../components/About"

const MainRouter = () => {
    const location = useLocation();    

    return (
        <div>
            {
                !['/login', '/signup'].includes(location.pathname) && <Header />
            }
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<RegisterUser />} />
                <Route exact path="/farmerhome" element={<FarmerHome />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/about" element={<About />} />
            </Routes>
        </div>
    )
}
export default MainRouter