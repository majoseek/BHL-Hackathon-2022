import { Row, Col } from "antd";
import "./styles.css";
import cookingBackground from "./background_cooking_vertical.png";
import findingBackground from "./background_finding_vertical.png";
import shoppingBackground from "./background_shopping_vertical.png";
import Logo from "./basket_logo.png";
const LandingPage = () => {
    return (
        <>
            <Row className="header">
                <Col span={24}>
                    <h1>Welcome, create your basket right now!</h1>

                    <h2>What are you searching for?</h2>
                </Col>
            </Row>
            <Row className="cards-wrapper">
                <Col className="category-landing" span={8}>
                    <img src={cookingBackground} alt={"MenuCard"} />
                    <span>Lorem ipsum</span>
                </Col>
                <Col className="category-landing" span={8}>
                    <img src={findingBackground} alt={"MenuCard"} />
                    <span>Lorem ipsum</span>
                </Col>
                <Col className="category-landing" span={8}>
                    <img src={shoppingBackground} alt={"MenuCard"} />
                    <span>Lorem ipsum</span>
                </Col>
            </Row>
        </>
    );
};
export default LandingPage;
