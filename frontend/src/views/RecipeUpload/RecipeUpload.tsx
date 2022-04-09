//@ts-nocheck
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { post } from "../../common/http/HttpRequestService";
const RecipeUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    async function handleUpload() {
        console.log("elo elo2");
        const formData = new FormData();
        formData.append("file", selectedFile);
    }

    const props = {
        beforeUpload: (file) => {
            setSelectedFile(file);
        },
    };

    return (
        <>
            <Upload>
                <Button
                    onChange={(e) => {
                        console.log("elo elo");
                        setSelectedFile(e.target);
                    }}
                    icon={<UploadOutlined />}
                >
                    Select File
                </Button>
            </Upload>
            <Button
                type="primary"
                onClick={() => handleUpload()}
                disabled={!selectedFile}
                style={{ marginTop: 16 }}
            >
                Start Upload
            </Button>
        </>
    );
};
export default RecipeUpload;
