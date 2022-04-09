//@ts-nocheck
import { Row, Col } from "antd";
import "./styles.css";
import cookingBackground from "./background_cooking_vertical.png";
import findingBackground from "./background_finding_vertical.png";
import shoppingBackground from "./background_shopping_vertical.png";
import { Button } from "primereact/button";
const LandingPage = () => {
    return (
        <>
            <Row className="header">
                <Col span={24}>
                    <h1>Welcome! Fill your basket right away</h1>
                    <h2>What do you need?</h2>
                </Col>
            </Row>
            <Row className="cards-wrapper">
                <Col className="category-landing" span={8}>
                    <div>
                        <span>Cooking from recipe?</span>
                        <label>
                            Just paste part of your recipe with the ingredients.
                            We'll take care of what you need to cook it!
                        </label>
                        <Button
                            label="Let's prepare!"
                            className="p-button-outlined"
                        />
                    </div>
                    <img src={cookingBackground} alt={"MenuCard"} />
                </Col>
                <Col className="category-landing" span={8}>
                    <img src={findingBackground} alt={"MenuCard"} />
                    <div>
                        <span>Planning a shopping?</span>
                        <label>
                            Choose what you want to aquire. See where you'll
                            find it. We will check where you can find it quickly
                            and cheaply.
                        </label>
                        <Button
                            label="Let's go shopping!"
                            className="p-button-outlined"
                        />
                    </div>
                </Col>
                <Col className="category-landing" span={8}>
                    <img src={shoppingBackground} alt={"MenuCard"} />
                    <div>
                        <span>Looking for product?</span>
                        <label>
                            Do you need a certain thing you're not sure is
                            available at your favourite store? We'll check,
                            where is your product.
                        </label>
                        <Button
                            label="Check availbility!"
                            className="p-button-outlined"
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default LandingPage;
