//@ts-nocheck
import { Row, Col } from "antd";
import { AutoComplete } from "primereact/autocomplete";
import { SearchProductTable } from "./table/SearchProductTable";
import { useState } from "react";
import { get } from "../../common/http/HttpRequestService";
import { UriBuilder } from "../../common/http/UriBuilder";
import { StockInfoDTO } from "./table/dto/StockInfo.dto";
import { useEffect } from "react";
import "./styles.css";

const SearchProductPage = () => {
    const [productNames, setProductNames] = useState<string[]>([]);
    const [filteredNames, setFilteredNames] = useState<string[]>([]);

    const [searchedText, setSearchedText] = useState<string>("");
    const [filteredTableValue, setFilteredTableValue] = useState<string>();
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

    const searchCountry = (event: any) => {
        const text = event.query;
        let filteredCountries = productNames.filter(
            (name) => name.toUpperCase().indexOf(text.toUpperCase()) !== -1
        );
        setFilteredNames(filteredCountries);
        setFilteredTableValue(text);
    };
    return (
        <>
            <Row style={{ marginTop: "80px" }}>
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
                    paddingBottom: "120px",
                }}
            >
                <Col offset={6} style={{ minWidth: "550px" }}>
                    <SearchProductTable name={filteredTableValue} />
                </Col>
            </Row>
        </>
    );
};
export default SearchProductPage;
