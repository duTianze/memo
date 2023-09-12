import { useState, useEffect, useRef, useMemo } from "react";
import { px, createStyles } from "@mantine/core";
import ImageResize from "quill-image-resize-module-react";
import ImageUploader from "quill-image-uploader";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.bubble.css";

window.Quill = Quill;
Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/imageResize", ImageResize);

const initMinHeight = 50;
const initMaxHeight = 500;

const useStyles = createStyles((theme) => {
    return {
        textEdit: {
            width: "100%",
            boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 1px 1px, rgb(51, 51, 51) 0px 0px 0px 1px",
        },
    };
});

function Editor({ form, setForm }) {
    const { classes } = useStyles();
    const editorRef = useRef();
    const [minWidth, setMinWidth] = useState(initMinHeight);

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

    useEffect(() => {
        const quill = editorRef.current.editor;
        const length = quill.getLength();
        if (length > 1) {
            setMinWidth(initMaxHeight);
        } else {
            setMinWidth(initMinHeight);
        }
    }, [form.content]);

    function getImgUrls(delta) {
        return delta.ops
            .filter((i) => i.insert && i.insert.image)
            .map((i) => i.insert.image);
    }

    return (
        <div className={classes.textEdit}>
            <ReactQuill
                theme="bubble"
                style={{ height: px(minWidth), width: "100%" }}
                value={form.content}
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
                    const updatedForm = { ...form, content };
                    if (inserted.length > 0 && form.image === "") {
                        updatedForm.backgroundUrl = inserted[0];
                    }
                    setForm(updatedForm);
                }}
                ref={editorRef}
            />
        </div>
    );
}

export default Editor;
