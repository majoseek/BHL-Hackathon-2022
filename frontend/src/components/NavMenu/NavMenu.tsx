//@ts-nocheck
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import LogoName from "./logo_name.png";
import "./styles.css";
const NavMenu = () => {
    const [visibleTop, setVisibleTop] = useState(false);
    return (
        <div>
            <div className="card">
                <Sidebar
                    visible={visibleTop}
                    position="top"
                    onHide={() => setVisibleTop(false)}
                >
                    <h3>Top Sidebar</h3>
                </Sidebar>

                <img src={LogoName} alt="Logo" />
                <Button
                    icon="pi pi-arrow-down"
                    onClick={() => setVisibleTop(true)}
                    className="mr-2 sidebar-icon"
                />
            </div>
        </div>
    );
};
export default NavMenu;
