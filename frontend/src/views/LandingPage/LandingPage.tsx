//@ts-nocheck
import { Row, Col } from "antd";
import "./styles.css";
import cookingBackground from "./background_cooking_vertical.png";
import findingBackground from "./background_finding_vertical.png";
import shoppingBackground from "./background_shopping_vertical.png";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
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
                        <Link to="/prepare" style={{ margin: "auto" }}>
                            <Button
                                label="Let's prepare!"
                                className="p-button-outlined"
                            />
                        </Link>
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

                        <Link to="/list" style={{ margin: "auto" }}>
                            <Button
                                label="Let's go shopping!"
                                className="p-button-outlined"
                            />
                        </Link>
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

                        <Link to="/availbility" style={{ margin: "auto" }}>
                            <Button
                                label="Check availbility!"
                                className="p-button-outlined"
                            />
                        </Link>
                    </div>
                </Col>
            </Row>
            <div
                className="custom-shape-divider-top-1649482630"
                style={{ paddingTop: "70px" }}
            >
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="shape-fill"
                    ></path>
                </svg>
            </div>
        </>
    );
};
export default LandingPage;
