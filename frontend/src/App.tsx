import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./views/LandingPage";
import ShoppingList from "./views/ShoppingList";
import "./App.css";
import NavMenu from "./components/NavMenu";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const App = () => {
    return (
        <BrowserRouter>
            <NavMenu/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/list" element={<ShoppingList/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
