import React from 'react';
import {FileUpload} from 'primereact/fileupload';
import {Tooltip} from 'primereact/tooltip';

export const RecipeUploadComponent = () => {

    const onUpload = () => {

    }


    return (
        <div>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom"/>
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom"/>

            <div className="card">
                <FileUpload name="demo[]" url="http://localhost:8080/recipes/byRecipe" onUpload={onUpload} multiple
                            accept="text/plain" maxFileSize={1000}
                            emptyTemplate={<p className="m-0">Drag and drop your own recipe.</p>}/>
            </div>
        </div>
    )
}