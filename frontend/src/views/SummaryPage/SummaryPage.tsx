//@ts-nocheck
import { get } from "../../common/http/HttpRequestService";
import React, { useEffect, useState } from "react";
import { ProductStockInfoDTO } from "./dto/ProductStockInfo.dto";
import { DataTable, DataTableRowClickEventParams } from "primereact/datatable";
import { Column } from "primereact/column";
import { Map, Marker } from "pigeon-maps";
import { useNavigate } from "react-router-dom";
import { ShopInfoDTO } from "./dto/ShopInfoDTO";

export interface SummaryPageProps {
    productIds: number[];
}

export const SummaryPage = (props: SummaryPageProps) => {
    const [geolocationCoordinates, setGeolocationCordinates] =
        useState<GeolocationCoordinates>();
    const [productStockInfos, setProductStockInfos] = useState<
        ProductStockInfoDTO[]
    >([]);

    const [latitude, setLatitude] = useState<number>();

    const navigate = useNavigate();

    useEffect(() => {
        if (props.productIds.length === 0) {
            navigate("/list");
        }
    }, []);

    useEffect(() => {
        loadSummary();
    }, []);

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    const loadSummary = () => {
        navigator.geolocation.getCurrentPosition(
            async (position: GeolocationPosition) => {
                setGeolocationCordinates(position.coords);
                const data: ProductStockInfoDTO[] = await get(
                    "/products/stockInfo",
                    {
                        userLatitude: position.coords.latitude,
                        userLongitude: position.coords.longitude,
                        productIds: props.productIds.join(","),
                    }
                );
                setProductStockInfos(data);
            },
            () => {},
            options
        );
    };

    const onRowClick = (data: DataTableRowClickEventParams) => {
        const clickedRow: ShopInfoDTO = data.data.shopInfoDTO;

        const updatedColors = productStockInfos.map((productStockInfo) => ({
            ...productStockInfo,
            markerColor:
                clickedRow?.id === productStockInfo?.shopInfoDTO?.id
                    ? "red"
                    : "green",
        }));
        //setProductStockInfos()
        setProductStockInfos(updatedColors);
        // setLatitude(clickedRow.latitude)
    };

    // @ts-ignore
    return (
        <>
            <div className={"p-grid"}>
                <div className={"p-col-6"}>
                    {geolocationCoordinates && (
                        <Map
                            height={300}
                            // @ts-ignore
                            center={[latitude, 1]}
                            defaultCenter={[
                                geolocationCoordinates?.latitude,
                                geolocationCoordinates?.longitude,
                            ]}
                            defaultZoom={11}
                        >
                            {/* @ts-ignore */}
                            <Marker
                                width={50}
                                anchor={[
                                    geolocationCoordinates?.latitude,
                                    geolocationCoordinates?.longitude,
                                ]}
                            />
                            {productStockInfos.map(
                                (productStockInfo: ProductStockInfoDTO) => (
                                    <Marker
                                        color={productStockInfo.markerColor}
                                        width={50}
                                        anchor={[
                                            productStockInfo?.shopInfoDTO
                                                ?.latitude,
                                            productStockInfo?.shopInfoDTO
                                                ?.longitude,
                                        ]}
                                    />
                                )
                            )}
                        </Map>
                    )}
                    {/* @ts-ignore */}
                </div>
                <div className={"p-col-6"}>
                    <DataTable
                        value={productStockInfos}
                        onRowClick={onRowClick}
                    >
                        <Column
                            header={"Shop"}
                            body={(productStockInfo: ProductStockInfoDTO) =>
                                productStockInfo?.shopInfoDTO?.name
                            }
                        />
                        <Column header={"Distance"} field={"distance"} />
                        <Column
                            header={"Available products"}
                            body={(productStockInfo: ProductStockInfoDTO) =>
                                productStockInfo.availableProducts
                                    .map((a) => a.name)
                                    .join(" ")
                            }
                        />
                    </DataTable>
                </div>
            </div>
        </>
    );
};
