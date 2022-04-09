//@ts-nocheck
import {get} from "../../common/http/HttpRequestService";
import {useEffect, useState} from "react";
import {ProductStockInfoDTO} from "./dto/ProductStockInfo.dto";
import {DataTable, DataTableRowClickEventParams} from "primereact/datatable";
import {Column} from "primereact/column";
import {Map, Marker} from "pigeon-maps";
import {useNavigate} from "react-router-dom";
import {ShopInfoDTO} from "./dto/ShopInfoDTO";
import {Slider, SliderChangeParams} from "primereact/slider";
import "./styles.css";

export interface SummaryPageProps {
    productIds: number[];
}

export const SummaryPage = (props: SummaryPageProps) => {
    const [geolocationCoordinates, setGeolocationCordinates] =
        useState<GeolocationCoordinates>();
    const [productStockInfos, setProductStockInfos] = useState<
        ProductStockInfoDTO[]
    >([]);

    const [sliderValue, setSliderValue] = useState<any>(0.5);

    const [latitude, setLatitude] = useState<number>();

    const navigate = useNavigate();

    useEffect(() => {
        if (props.productIds.length === 0) {
            navigate("/list");
        }
    }, []);

    useEffect(() => {
        loadSummary();
    }, [sliderValue]);

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    const [shopsQuantity, setShopsQuantity] = useState(0);
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
                        QCoefficient: sliderValue,
                    }
                );
                const sortedData = data.sort(
                    (obj1, obj2) =>
                        obj2.optimalParamValue - obj1.optimalParamValue
                );
                setProductStockInfos(data);
                setShopsQuantity(data.length);
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
        setProductStockInfos(updatedColors);
        // setLatitude(clickedRow.latitude)
    };

    // @ts-ignore
    return (
        <>
            <div className={"p-grid"}>
                <div className={"p-col-6"}>
                    <h2>
                        {shopsQuantity === 0
                            ? "We didn't find shops, that may interest you."
                            : `We found ${shopsQuantity} shops that may interest you!`}
                    </h2>
                    {geolocationCoordinates && (
                        <Map
                            height={600}
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
                                (
                                    productStockInfo: ProductStockInfoDTO,
                                    index
                                ) => (
                                    <Marker
                                        key={`${index}_productstock`}
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
                            header={"ID"}
                            body={(_, { rowIndex }) => rowIndex + 1}
                        />
                        <Column
                            header={"Shop"}
                            body={(productStockInfo: ProductStockInfoDTO) =>
                                productStockInfo?.shopInfoDTO?.name
                            }
                        />
                        <Column header={"Distance [km]"} field={"distance"} />
                        <Column
                            header={"Non-available products"}
                            body={(productStockInfo: ProductStockInfoDTO) =>
                                productStockInfo.availableProducts
                                    .map((a) => a.name)
                                    .join(" ")
                            }
                        />
                    </DataTable>
                </div>
                <div className={"p-col-6"}>
                    {/* @ts-ignore */}
                    <div className={"p-grid p-d-flex"}>
                        <div class={"row"}>
                            <span>Najtaniej</span>
                        </div>
                        <div className={"row"}>
                            <span>Optymalnie</span>
                        </div>
                        <div className={"row"}>
                            <span>Najbliżej</span>
                        </div>
                    </div>
                    <Slider
                        min={0}
                        max={1}
                        step={0.25}
                        value={sliderValue}
                        onChange={(e: SliderChangeParams) => {
                            setSliderValue(e.value);
                        }}
                    />
                </div>
            </div>
            <div className="custom-shape-divider-bottom-1649482509">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="shape-fill"
                    ></path>
                </svg>
            </div>
        </>
    );
};
