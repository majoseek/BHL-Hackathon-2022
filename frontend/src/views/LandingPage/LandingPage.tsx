import { Row, Col } from "antd";
import "./styles.css";
import cookingBackground from "./background_cooking_mono_dimm.png";
import { Button } from "primereact/button";
const LandingPage = () => {
    return (
        <>
            <Row className="header">
                <Col span={24}>
                    <h1>Welcome, create your [LOGO]</h1>
                    <h2>What are you searching for?</h2>
                </Col>
            </Row>
            <Row>
                <Col className="category-landing" span={8}>
                    <img src={cookingBackground} style={{ width: "100%" }} />
                </Col>
                <Col className="category-landing" span={8}>
                    col-8
                </Col>
                <Col className="category-landing" span={8}>
                    col-8
                </Col>
            </Row>
        </>
    );
};
export default LandingPage;
