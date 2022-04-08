import React, {useEffect, useState} from "react";
import ProductsTable from "../../components/ProductsTable";
import {AutoComplete, Col, Input, Row} from "antd";
import ProductCard from "../../components/ProductCard";
import "./styles.css";
import {ProductsTableDictionary} from "./table/ProductsTableDictionary";
import {get} from "../../common/http/HttpRequestService";
import {UriBuilder} from "../../common/http/UriBuilder";
import {StockInfoDTO} from "./table/dto/StockInfo.dto";
import {Button} from "primereact/button";

const options = [
    {value: "Szynka konserwowa"},
    {value: "Szynka jakaś tam"},
    {value: "Szynka sokołów"},
    {value: "Mleko"},
    {value: "Jajko"},
    {value: "Wołowina"},
];

const ShoppingList = () => {
    const [productNames, setProductNames] = useState<any[]>([]);
    const [searchedText, setSearchedText] = useState<string>("");
    const [filteredTableValue, setFilteredTableValue] = useState<string>()


    useEffect(() => {
        fetchProductInfo()
    }, [])


    const fetchProductInfo = async () => {
        const productInfo: StockInfoDTO[] = await get(
            new UriBuilder()
                .all("products")
                .build()
        );
        const productNames = productInfo.map(product => ({value: product.name}));
        setProductNames(productNames);
    }


    return (
        <React.Fragment>
            <Button/>
            <Row>
                <Col span={8}>
                    <ProductsTable/>
                </Col>
                <Col span={16}>
                    <h2>Most common categories</h2>
                    <div className="card-holder">
                        <ProductCard
                            imageSource="https://images.unsplash.com/photo-1523473827533-2a64d0d36748?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                            name="Dairy"
                        />
                        <ProductCard
                            imageSource="https://images.unsplash.com/photo-1551888761-382cd30b5da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                            name="Bread"
                        />
                        <ProductCard
                            imageSource="https://images.unsplash.com/photo-1562166453-964fd947f2a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                            name="Fruits"
                        />
                        <ProductCard
                            imageSource="https://images.unsplash.com/photo-1526470303-82c787d88682?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=932&q=80"
                            name="Vegetables"
                        />
                        <ProductCard
                            imageSource="https://images.unsplash.com/photo-1603903631889-b5f3ba4d5b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                            name="Snacks"
                        />
                        <ProductCard
                            imageSource="https://images.unsplash.com/photo-1632789395770-20e6f63be806?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=839&q=80"
                            name="Drinks"
                        />
                    </div>
                    <AutoComplete
                        options={productNames}
                        filterOption={(inputValue, option) =>
                            option!.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                    >
                        <Input.Search size="large" placeholder="input here" value={searchedText}
                                      onChange={(e) => setSearchedText(e.target.value)}
                                      onSearch={setFilteredTableValue}

                        />
                    </AutoComplete>
                    <h1>wyszukane produkty</h1>

                    <ProductsTableDictionary name={filteredTableValue}/>
                </Col>
            </Row>
        </React.Fragment>
    );
};
export default ShoppingList;
