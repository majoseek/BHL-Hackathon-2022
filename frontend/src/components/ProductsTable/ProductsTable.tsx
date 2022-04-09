//@ts-nocheck
import "./styles.css";
import {ShoppingListElementDTO} from "../../views/ShoppingList/table/dto/ShoppingListElementDTO";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";

export interface ProductsTableProps {
    shoppingListElements: ShoppingListElementDTO[];
    onDeleteElement: (id: number) => void;
}

const ProductsTable = (props: ProductsTableProps) => {
    const getButtonTemplate = (shoppingListElement: ShoppingListElementDTO) => {
        return (
            <>

                <Button
                    type="button"
                    icon="pi pi-trash"
                    onClick={() =>
                        props.onDeleteElement(shoppingListElement.productId)
                    }
                />
            </>

        );
    };

    return (
        <DataTable value={props.shoppingListElements}>
            <Column header={"Name"} field={"productName"}/>
            <Column header="Average price" body={(product) => {
                const val = product.averagePrice / 100;
                return val > 0 ? String(val) + " zł" : "-";
            }}/>
            <Column body={getButtonTemplate}/>
        </DataTable>
    );
};
export default ProductsTable;
