import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./views/LandingPage";
import ShoppingList from "./views/ShoppingList";
import "./App.css";
import NavMenu from "./components/NavMenu";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import SearchProductPage from "./views/SearchProductPage/SearchProductPage";
import {useState} from "react";
import {SummaryPage} from "./views/SummaryPage/SummaryPage";
import RecipeUpload from "./views/RecipeUpload/RecipeUpload";
import {ShoppingListElementDTO} from "./views/ShoppingList/table/dto/ShoppingListElementDTO";

const App = () => {
    const [selectedProductsIDs, setSelectedProductIds] = useState<number[]>([]);
    const [shoppingListElements, setShoppingListElements] = useState<ShoppingListElementDTO[]>([]);

    return (
        <BrowserRouter>
            <NavMenu/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route
                    path="/list"
                    element={
                        <ShoppingList
                            setSelectedProductIds={setSelectedProductIds}
                            shoppingListElements={shoppingListElements}
                            setShoppingListElements={setShoppingListElements}
                        />
                    }
                />
                <Route
                    path="/map"
                    element={<SummaryPage productIds={selectedProductsIDs}/>}
                />
                <Route path="/availbility" element={<SearchProductPage/>}/>
                <Route path="/uploadRecipe" element={
                    <RecipeUpload setShoppingListElements={setShoppingListElements}/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
