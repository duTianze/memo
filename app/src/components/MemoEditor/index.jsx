import { useState, useEffect } from "react";
import { Button, MultiSelect, TextInput, Group } from "@mantine/core";
import dynamic from "next/dynamic";
import useStyles from "./index.styles";

const Editor = dynamic(import("@/components/MemoEditor/Editor"), {
    ssr: false,
});

const formDataInit = {
    title: "",
    content: "",
    image: "",
    tagIds: [],
};

export default function MemoEditor({ loadPostHanlder }) {
    const [form, setForm] = useState(formDataInit);
    const [focused, setFocused] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [tags, setTags] = useState([]);
    const { classes, theme } = useStyles({
        floating: isEdit || focused,
    });

    useEffect(() => {
        setIsEdit(form.title.length > 0);
    }, [form.title]);

    useEffect(() => {
        selectChangeHandler("");
    }, []);

    const selectChangeHandler = (value) => {
        fetch(`http://localhost:8080/api/tag/search?name=${value}`)
            .then((response) => response.json())
            .then((result) => {
                setTags(
                    result.content.map((item) => ({
                        label: item.name,
                        value: item.id.toString(),
                    }))
                );
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const saveHandler = () => {
        fetch("http://localhost:8080/api/post", {
            method: "POST",
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...form,
            }),
        }).then((response) => {
            setForm(formDataInit);
            setIsEdit(false);
            loadPostHanlder();
        });
    };

    return (
        <Group className={classes.editor} position="right">
            <TextInput
                label="添加"
                required
                classNames={classes}
                value={form.title}
                onChange={(event) =>
                    setForm({ ...form, title: event.currentTarget.value })
                }
                mt="md"
                autoComplete="nope"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {isEdit ? (
                <>
                    <Editor form={form} setForm={setForm} />
                    <MultiSelect
                        data={tags}
                        value={form.tagIds}
                        placeholder="选择标签"
                        searchable
                        creatable
                        clearable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={(query) => {
                            const item = { value: query, label: query };
                            setTags((current) => [...current, item]);
                            return item;
                        }}
                        onChange={(value) =>
                            setForm({ ...form, tagIds: value })
                        }
                        onSearchChange={selectChangeHandler}
                    />
                    <Button className={classes.control} onClick={saveHandler}>
                        保存
                    </Button>
                </>
            ) : undefined}
        </Group>
    );
}
