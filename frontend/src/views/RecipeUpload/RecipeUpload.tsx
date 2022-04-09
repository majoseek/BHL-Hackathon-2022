//@ts-nocheck
import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router-dom";

export interface RecipeUploadProps {
    setShoppingListElements: (elements: any) => void;
}

export const RecipeUpload = (props: RecipeUploadProps) => {
    const navigate = useNavigate();
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    return (
        <div>
            <Tooltip
                target=".custom-choose-btn"
                content="Choose"
                position="bottom"
            />
            <Tooltip
                target=".custom-upload-btn"
                content="Upload"
                position="bottom"
            />
            <Tooltip
                target=".custom-cancel-btn"
                content="Clear"
                position="bottom"
            />

            <div className="card">
                <FileUpload
                    name="demo[]"
                    url="https://primefaces.org/primereact/showcase/upload.php"
                    onUpload={() => {
                        props.setShoppingListElements([
                            {
                                productId: 50,
                                productName: "mleko swieze 2,0%",
                                averagePrice: 9521,
                            },
                            {
                                productId: 93,
                                name: "Gostynskie mleko zageszczone nieslodzone",
                                averagePrice: 9875,
                            },
                            {
                                productId: 26,
                                productName: "Bio mleko pelne",
                                averagePrice: 8508,
                            },
                            {
                                productId: 144,
                                productName: "Swieze mleko 2%",
                                averagePrice: 11664,
                            },
                            {
                                productId: 53,
                                productName: "Fruit musli",
                                averagePrice: 9337,
                            },
                            {
                                productId: 227,
                                productName: "Nalesniki z serem twarogowym",
                                averagePrice: 10201,
                            },
                            {
                                productId: 129,
                                productName: "Ser twarogowy poltlusty",
                                averagePrice: 10473,
                            },
                        ]);

                        navigate("/list", { replace: true });
                    }}
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    emptyTemplate={
                        <p className="m-0">
                            Drag and drop your recipe here to upload products.
                        </p>
                    }
                />
            </div>
        </div>
    );
};
export default RecipeUpload;
