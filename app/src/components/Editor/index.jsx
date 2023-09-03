import { useState, useEffect, useRef } from "react";
import { px, createStyles } from "@mantine/core";
import ImageResize from "quill-image-resize-module-react";
import { SelectLength } from "./SelectLength";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.bubble.css";

window.Quill = Quill;
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/selectLength", SelectLength);

const initMinHeight = 50;
const initMaxHeight = 500;

const useStyles = createStyles((theme) => {
    return {
        textEdit: {
            width: "100%",
        },
    };
});

function Editor({ content, setContent }) {
    const { classes } = useStyles();
    const editorRef = useRef();

    const [minWidth, setMinWidth] = useState(initMinHeight);

    useEffect(() => {
        const quill = editorRef.current.editor;
        setMinWidth(
            Math.min(
                Math.max(initMinHeight, quill.root.totalLength),
                initMaxHeight
            )
        );
    }, [content]);

    return (
        <div className={classes.textEdit}>
            <ReactQuill
                theme="bubble"
                style={{ height: px(minWidth), width: "100%" }}
                value={content}
                modules={{
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
                    selectLength: {},
                }}
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
                onChange={setContent}
                ref={editorRef}
            />
        </div>
    );
}

export default Editor;
