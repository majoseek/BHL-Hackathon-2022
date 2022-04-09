import {ProductInfoDTO} from "../../../ShoppingList/table/dto/ProductInfo.dto";

export interface StockInfoDTO {
    id: number;
    name: string;
    longtitude: number;
    latitude: number;
    price: number;
    quantity: number;
    productInfoDTO?: ProductInfoDTO[];
}
