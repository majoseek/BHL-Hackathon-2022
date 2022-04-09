import {ShopInfoDTO} from "./ShopInfoDTO";
import {ProductInfoDTO} from "../../ShoppingList/table/dto/ProductInfo.dto";

export interface ProductStockInfoDTO {
    shopInfoDTO: ShopInfoDTO;
    distance: number;
    availableProducts: ProductInfoDTO[];

    markerColor?: string;
}