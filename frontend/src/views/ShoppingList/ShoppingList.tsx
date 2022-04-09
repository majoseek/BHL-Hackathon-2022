//@ts-nocheck
import React, { useEffect, useState } from "react";
import ProductsTable from "../../components/ProductsTable";
import { Col, Divider, Row } from "antd";
import ProductCard from "../../components/ProductCard";
import "./styles.css";
import { ProductsTableDictionary } from "./table/ProductsTableDictionary";
import { get } from "../../common/http/HttpRequestService";
import { UriBuilder } from "../../common/http/UriBuilder";
import { StockInfoDTO } from "./table/dto/StockInfo.dto";
import { Button } from "primereact/button";
import { ShoppingListElementDTO } from "./table/dto/ShoppingListElementDTO";
import { ProductInfoDTO } from "./table/dto/ProductInfo.dto";
import { useNavigate } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";

const options = [
    { value: "Szynka konserwowa" },
    { value: "Szynka jakaś tam" },
    { value: "Szynka sokołów" },
    { value: "Mleko" },
    { value: "Jajko" },
    { value: "Wołowina" },
];

export interface ShoppingListProps {
    setSelectedProductIds: (ids: number[]) => void;
}

const ShoppingList = (props: ShoppingListProps) => {
    const [productNames, setProductNames] = useState<string[]>([]);
    const [filteredNames, setFilteredNames] = useState<string[]>([]);

    const [searchedText, setSearchedText] = useState<string>("");
    const [filteredTableValue, setFilteredTableValue] = useState<string>();

    const [selectedTag, setSelectedTag] = useState<string>();

    const [shoppingListElements, setShoppingListElements] = useState<
        ShoppingListElementDTO[]
    >([]);

    const navigate = useNavigate();

    const onRedirect = () => {
        props.setSelectedProductIds(
            shoppingListElements.map((product) => product.productId)
        );
        navigate("/map");
    };

    useEffect(() => {
        fetchProductInfo();
    }, []);
    const fetchProductInfo = async () => {
        const productInfo: StockInfoDTO[] = await get(
            new UriBuilder().all("products").build()
        );
        const productNames = productInfo.map((product) => product.name);
        setProductNames(productNames);
    };

    const onProductAdd = (productInfoDTO: ProductInfoDTO) => {
        if (
            shoppingListElements.some((el) => el.productId == productInfoDTO.id)
        ) {
            return;
        }
        const shoppingListElement: ShoppingListElementDTO = {
            productName: productInfoDTO.name,
            productId: productInfoDTO.id,
            averagePrice: productInfoDTO.averagePrice,
        };
        setShoppingListElements([...shoppingListElements, shoppingListElement]);
    };

    const onProductDelete = (toDeleteId: number) => {
        setShoppingListElements(
            shoppingListElements.filter((id) => id.productId !== toDeleteId)
        );
    };

    const searchCountry = (event: any) => {
        const text = event.query;
        let filteredCountries = productNames.filter(
            (name) => name.toUpperCase().indexOf(text.toUpperCase()) !== -1
        );
        console.log(filteredCountries);
        setFilteredNames(filteredCountries);
        setFilteredTableValue(text);
    };

    const catagoriesData = [
        {
            imageSource:
                "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
            name: "Dairy",
        },

        {
            imageSource:
                "https://images.unsplash.com/photo-1551888761-382cd30b5da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
            name: "Bread",
        },
        {
            imageSource:
                "https://images.unsplash.com/photo-1562166453-964fd947f2a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
            name: "Fruits",
        },
        {
            imageSource:
                "https://images.unsplash.com/photo-1526470303-82c787d88682?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=932&q=80",
            name: "Vegetables",
        },
        {
            imageSource:
                "https://images.unsplash.com/photo-1603903631889-b5f3ba4d5b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
            name: "Snacks",
        },
        {
            imageSource:
                "https://images.unsplash.com/photo-1632789395770-20e6f63be806?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=839&q=80",
            name: "Drinks",
        },
        {
            imageSource:
                "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
            name: "Alcohol",
        },
        {
            imageSource:
                "https://images.unsplash.com/photo-1625937329935-287441889bce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
            name: "Meat",
        },
    ];

    // @ts-ignore
    return (
        <React.Fragment>
            <Row className="main-container" gutter={8}>
                <Col span={10} style={{ textAlign: "center" }}>
                    <h2 style={{ marginBottom: "20px" }}>Your products</h2>
                    <ProductsTable
                        shoppingListElements={shoppingListElements}
                        onDeleteElement={onProductDelete}
                    />
                    <Button
                        className="proceed-button"
                        label="Proceed"
                        onClick={onRedirect}
                        disabled={!shoppingListElements.length}
                    />
                </Col>
                <Col span={14}>
                    <h2>Most common categories</h2>
                    <div className="card-holder">
                        {catagoriesData.map((categories) => {
                            return (
                                <ProductCard
                                    imageSource={categories.imageSource}
                                    name={categories.name}
                                    onCardClicked={(name) => {
                                        return setSelectedTag(
                                            selectedTag !== name
                                                ? name
                                                : undefined
                                        );
                                    }}
                                    disabled={selectedTag !== categories.name}
                                />
                            );
                        })}
                    </div>
                </Col>
                <Divider />
            </Row>
            <Row>
                <Col offset={10}>
                    <AutoComplete
                        value={searchedText}
                        suggestions={filteredNames}
                        completeMethod={searchCountry}
                        onChange={(e) => setSearchedText(e.value)}
                        placeholder={"Enter product name"}
                    />
                </Col>
            </Row>
            <Row
                style={{
                    marginTop: "40px",
                    paddingBottom: "100px",
                }}
            >
                <Col offset={6} style={{ minWidth: "550px" }}>
                    <ProductsTableDictionary
                        name={filteredTableValue}
                        tag={selectedTag}
                        onProductAdd={onProductAdd}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};
export default ShoppingList;
