import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppLayout from "../pages/appLayout";
import Home from "../pages/home";
import Login from "../pages/login";


const MyRoutes = () => {
    return (
        <Router>
            <Routes>
            <Route element={<AppLayout />}>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
            </Route>
            </Routes>
        </Router>
    )
}

export default MyRoutes;