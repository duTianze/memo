import { useRef, useMemo } from "react";
import ImageResize from "quill-image-resize-module-react";
import ImageUploader from "quill-image-uploader";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
window.Quill = Quill;
Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/imageResize", ImageResize);
const BaseImageFormat = Quill.import("formats/image");
const ImageFormatAttributesList = ["alt", "height", "width", "style"];
class ImageFormat extends BaseImageFormat {
    static formats(domNode) {
        return ImageFormatAttributesList.reduce(function (formats, attribute) {
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});
    }
    format(name, value) {
        if (ImageFormatAttributesList.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name);
            }
        } else {
            super.format(name, value);
        }
    }
}
Quill.register(ImageFormat, true);

function Editor({ memo, setMemo }) {
    const editorRef = useRef();

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "check" },
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["code-block"],
                [("link", "image", "video")],
                ["clean"],
            ],
            clipboard: {
                matchVisual: false,
            },
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

                        fetch("/api/image/upload", {
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

    function getScrollParent(node) {
        if (!node) {
            return document.documentElement;
        }

        const overflowY =
            (node instanceof HTMLElement &&
                window.getComputedStyle(node).overflowY) ||
            "";
        const isScrollable = !(
            overflowY.includes("hidden") || overflowY.includes("visible")
        );

        if (isScrollable && node.scrollHeight >= node.clientHeight) {
            return node;
        }

        return getScrollParent(node.parentNode);
    }

    return (
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
                "code-block",
                "alt",
                "height",
                "width",
                "style",
            ]}
            onChange={(content, delta, source, editor) => {
                setMemo({ content: content });
            }}
            ref={editorRef}
            scrollingContainer="html"
        />
    );
}

export default Editor;
