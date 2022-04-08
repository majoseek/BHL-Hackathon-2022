import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import ShoppingList from "./views/ShoppingList";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/list" element={<ShoppingList />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
