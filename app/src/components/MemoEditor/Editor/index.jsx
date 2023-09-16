import { useState, useEffect, useRef, useMemo } from "react";
import { px, createStyles } from "@mantine/core";
import ImageResize from "quill-image-resize-module-react";
import ImageUploader from "quill-image-uploader";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
window.Quill = Quill;
Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/imageResize", ImageResize);

const useStyles = createStyles((theme, { height }) => {
    return {
        textEdit: {
            height: `${height}`,
            width: "100%",
            boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 1px 1px, rgb(51, 51, 51) 0px 0px 0px 1px",
            margin: "16px 0",
            minHeight: "500px",
        },
    };
});

function Editor({ memo, setMemo, height }) {
    const { classes } = useStyles({ height });
    const editorRef = useRef();

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
            ],
            imageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize", "Toolbar"],
                displayStyles: {
                    with: "10px",
                },
            },
            imageUploader: {
                upload: (file) => {
                    return new Promise((resolve, reject) => {
                        const formData = new FormData();
                        formData.append("image", file);

                        fetch("http://localhost:8080/api/image/upload", {
                            method: "POST",
                            body: formData,
                        })
                            .then((response) => response.text())
                            .then((result) => {
                                resolve(result);
                            })
                            .catch((error) => {
                                reject("Upload failed");
                                console.error("Error:", error);
                            });
                    });
                },
            },
        }),
        []
    );

    function getImgUrls(delta) {
        return delta.ops
            .filter((i) => i.insert && i.insert.image)
            .map((i) => i.insert.image);
    }

    return (
        <div className={classes.textEdit}>
            <ReactQuill
                theme="snow"
                value={memo.content}
                modules={modules}
                formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                ]}
                onChange={(content, delta, source, editor) => {
                    const inserted = getImgUrls(delta);
                    const updatedMemo = { content: content };
                    if (inserted.length > 0 && memo.background === "") {
                        updatedMemo.background = inserted[0];
                    }
                    setMemo(updatedMemo);
                }}
                ref={editorRef}
            />
        </div>
    );
}

export default Editor;
