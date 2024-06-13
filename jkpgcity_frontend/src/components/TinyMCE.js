import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

function TinyMCE({ id, value, onChange, register, name, className }) {

    return (
        <Editor
            className={className}
            value={value}
            apiKey="tkg3rwz1ge3xzpr1f7sm15oq6piiy18zo7cmotlvp7ju6gil"
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table typography paste  code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | typography | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;  }',

                id: id
            }}
            onEditorChange={(content, editor) => {
                console.log(content);
                onChange({ target: { name, value: content } });
            }}
        />
    );
}

export default TinyMCE;
