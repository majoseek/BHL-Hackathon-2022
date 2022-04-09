//@ts-nocheck
import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";

export const RecipeUpload = () => {
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue =
            fileUploadRef && fileUploadRef.current
                ? fileUploadRef.current.formatSize(totalSize)
                : "0 B";

        return (
            <div
                className={className}
                style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar
                    value={value}
                    displayValueTemplate={() => `${formatedValue} / 1 MB`}
                    style={{
                        width: "300px",
                        height: "20px",
                        marginLeft: "auto",
                    }}
                ></ProgressBar>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div
                    className="flex align-items-center"
                    style={{ width: "40%" }}
                >
                    <img
                        alt={file.name}
                        role="presentation"
                        src={file.objectURL}
                        width={100}
                    />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag
                    value={props.formatSize}
                    severity="warning"
                    className="px-3 py-2"
                />
                <Button
                    type="button"
                    icon="pi pi-times"
                    className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                    onClick={() => onTemplateRemove(file, props.onRemove)}
                />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i
                    className="pi pi-image mt-3 p-5"
                    style={{
                        fontSize: "5em",
                        borderRadius: "50%",
                        backgroundColor: "var(--surface-b)",
                        color: "var(--surface-d)",
                    }}
                ></i>
                <span
                    style={{
                        fontSize: "1.2em",
                        color: "var(--text-color-secondary)",
                    }}
                    className="my-5"
                >
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = {
        icon: "pi pi-fw pi-images",
        iconOnly: true,
        className: "custom-choose-btn p-button-rounded p-button-outlined",
    };
    const uploadOptions = {
        icon: "pi pi-fw pi-cloud-upload",
        iconOnly: true,
        className:
            "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
    };
    const cancelOptions = {
        icon: "pi pi-fw pi-times",
        iconOnly: true,
        className:
            "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    };

    return (
        <div>
            <Toast ref={toast}></Toast>

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
                    onUpload={onUpload}
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    emptyTemplate={
                        <p className="m-0">
                            Drag and drop files to here to upload.
                        </p>
                    }
                />
            </div>
        </div>
    );
};
export default RecipeUpload;
