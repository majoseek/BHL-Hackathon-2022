// @ts-nocheck
import React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {StockInfoDTO} from "./dto/StockInfo.dto";
import {Button} from "primereact/button";
import {ProductInfoDTO} from "./dto/ProductInfo.dto";

interface ProductsTableProps {
    stockInfo: StockInfoDTO[];
    onProductAdd: (productInfoDTO: ProductInfoDTO) => void;
}

export const ProductsTableDictionary = (props: ProductsTableProps) => {
    const actionBodyTemplate = (productInfo: ProductInfoDTO) => {
        return (
            <>
                {productInfo.averagePrice > 0 ? (
                    <Button
                        type="button"
                        icon="pi pi-plus"
                        onClick={() => props.onProductAdd(productInfo)}
                    />
                ) : (
                    <></>
                )}
            </>
        );
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
            <DataTable value={props.stockInfo} responsiveLayout="scroll">
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
                <Column
                    headerStyle={{ width: "4rem", textAlign: "center" }}
                    bodyStyle={{ textAlign: "center", overflow: "visible" }}
                    body={actionBodyTemplate}
                />
            </DataTable>
        </div>
    );
};
