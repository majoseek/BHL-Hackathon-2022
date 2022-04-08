import { Table } from "antd";
import "./styles.css";
const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Price",
        dataIndex: "price",
        sorter: {
            compare: (a: any, b: any) => a.price - b.price,
        },
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
    },
];

const dataSource = [
    {
        key: 1,
        name: "Mleko",
        price: 5,
        quantity: 2,
    },
    {
        key: 2,
        name: "Wołowina",
        price: 11,
        quantity: 3,
    },
    {
        key: 3,
        name: "Jajko",
        price: 2,
        quantity: 12,
    },
    {
        key: 4,
        name: "Mleko",
        price: 98,
        quantity: 60,
    },
    {
        key: 5,
        name: "Pierś z kurczaka",
        price: 22,
        quantity: 1,
    },
    {
        key: 6,
        name: "Pierś z kurczaka",
        price: 22,
        quantity: 1,
    },
    {
        key: 7,
        name: "Pierś z kurczaka",
        price: 22,
        quantity: 1,
    },
    {
        key: 8,
        name: "Pierś z kurczaka",
        price: 22,
        quantity: 1,
    },
    {
        key: 9,
        name: "Pierś z kurczaka",
        price: 22,
        quantity: 1,
    },
    {
        key: 10,
        name: "Pierś z kurczaka",
        price: 22,
        quantity: 1,
    },
    {
        key: 5,
        name: "Pierś z kurczaka",
        price: 22,
        quantity: 1,
    },
];

const ProductsTable = () => {
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 8 }}
        />
    );
};
export default ProductsTable;
