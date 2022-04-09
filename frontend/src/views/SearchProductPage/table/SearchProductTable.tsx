// @ts-nocheck
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { get } from "../../../common/http/HttpRequestService";
import { UriBuilder } from "../../../common/http/UriBuilder";
import { StockInfoDTO } from "./dto/StockInfo.dto";
import { Button } from "primereact/button";
import { ProductInfoDTO } from "./dto/ProductInfo.dto";

interface ProductsTableProps {
    name?: string;
}

export const SearchProductTable = (props: ProductsTableProps) => {
    const [stockInfo, setStockInfo] = useState<StockInfoDTO[]>([]);

    useEffect(() => {
        fetchProductInfo();
    }, [props.name]);

    const fetchProductInfo = async () => {
        if (!props.name) {
            return;
        }
        const productInfo = await get(
            new UriBuilder().all("products").build(),
            {
                name: props.name,
            }
        );

        // @ts-ignore
        setStockInfo(productInfo);
    };

    const getProductTemplate = (productInfo: ProductInfoDTO) => {
        return (
            <>
                <img
                    alt="flag"
                    src={productInfo?.imgURL}
                    onError={(e) =>
                        (e.target.src =
                            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                    }
                    width={30}
                    style={{ borderRadius: "5px" }}
                />
                <span className="image-text" style={{ marginLeft: "0,5rem" }}>
                    {productInfo?.name}
                </span>
            </>
        );
    };

    return (
        <div className="datatable-doc-demo">
            <DataTable value={stockInfo} responsiveLayout="scroll">
                <Column
                    field="name"
                    header="Name"
                    body={getProductTemplate}
                ></Column>
                <Column
                    header="Average price"
                    body={(product) => {
                        const val = product.averagePrice / 100;
                        return val > 0 ? String(val) + " zł" : "-";
                    }}
                />
            </DataTable>
        </div>
    );
};
