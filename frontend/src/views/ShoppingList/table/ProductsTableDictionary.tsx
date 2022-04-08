import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {get} from "../../../common/http/HttpRequestService";
import {UriBuilder} from "../../../common/http/UriBuilder";
import {StockInfoDTO} from "./dto/StockInfo.dto";

interface ProductsTableProps {
    name?: string;
}


export const ProductsTableDictionary = (props: ProductsTableProps) => {
    const [stockInfo, setStockInfo] = useState<StockInfoDTO[]>([]);

    useEffect(() => {
        fetchProductInfo()
    }, [props.name])


    const fetchProductInfo = async () => {
        const productInfo = await get(
            new UriBuilder()
                .all("products")
                .build(),
            {
                name: props.name
            }
        );

        // @ts-ignore
        setStockInfo(productInfo);
        console.log(productInfo);
    }

    // @ts-ignore
    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

    const avgStockPrice = (productInfo: StockInfoDTO) => average(productInfo.stockAvailability.map(info => info.price))

    return (
        <div className="datatable-doc-demo">
            <DataTable value={stockInfo} responsiveLayout="scroll">
                <Column field="name" header="Name"></Column>
                <Column body={avgStockPrice}/>
                {/*<Column field="name" header="Name"></Column>*/}
                {/*<Column field="category" header="Category"></Column>*/}
                {/*<Column field="quantity" header="Quantity" body={}></Column>*/}
            </DataTable>
            {/*
                Nazwa
                Katagoria
                Średnia cena
            */}
            {/*<div className="card">*/}
            {/*    <DataTable value={props.productsTableInfo} className="p-datatable-customers">*/}

            {/*        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>*/}
            {/*        <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />*/}
            {/*        <Column field="country.name"*/}
            {/*                header="Country"*/}
            {/*                sortable filterField="country.name"*/}
            {/*                style={{ minWidth: '14rem' }}*/}
            {/*                body={countryBodyTemplate}*/}
            {/*                filter*/}
            {/*                filterPlaceholder="Search by country"*/}
            {/*        />*/}
            {/*        /!*<Column header="Agent" sortable sortField="representative.name" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} body={representativeBodyTemplate}*!/*/}
            {/*        /!*        filter filterElement={representativeFilterTemplate} />*!/*/}
            {/*        /!*<Column field="date" header="Date" sortable filterField="date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate}*!/*/}
            {/*        /!*        filter filterElement={dateFilterTemplate} />*!/*/}
            {/*        /!*<Column field="balance" header="Balance" sortable dataType="numeric" style={{ minWidth: '8rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />*!/*/}
            {/*        /!*<Column field="status" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '10rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />*!/*/}
            {/*        /!*<Column field="activity" header="Activity" sortable showFilterMatchModes={false} style={{ minWidth: '10rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />*!/*/}
            {/*        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />*/}
            {/*    </DataTable>*/}
            {/*</div>*/}
        </div>
    );
}