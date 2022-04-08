import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";

const NavMenu = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item key="create_list_icon" icon={<MailOutlined />}>
                Some random
            </Menu.Item>
            <Menu.Item key="find_product_icon" icon={<MailOutlined />}>
                Find product
            </Menu.Item>
            <Menu.Item key="panel_admin" icon={<MailOutlined />}>
                Panel admin
            </Menu.Item>
            <Menu.Item key="cos_tam" icon={<MailOutlined />}>
                Elko elko
            </Menu.Item>
        </Menu>
    );
};
export default NavMenu;
