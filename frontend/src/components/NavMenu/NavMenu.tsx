//@ts-nocheck
import LogoName from "./logo_name.png";
import "./styles.css";
import { Divider } from "antd";
const NavMenu = () => {
    return (
        <div>
            <div className="card">
                <img src={LogoName} alt="Logo" />
            </div>
            <Divider />
        </div>
    );
};
export default NavMenu;
