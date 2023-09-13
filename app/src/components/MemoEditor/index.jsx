import { useState, useEffect, useContext } from "react";
import { Button, MultiSelect, TextInput, Group } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import dynamic from "next/dynamic";
import useStyles from "./index.styles";
import GlobalContext from "@/pages/global-context";

const Editor = dynamic(import("@/components/MemoEditor/Editor"), {
    ssr: false,
});

export default function MemoEditor({
    memo,
    setMemo,
    height,
    width,
    edit,
    saveAfter,
}) {
    const {
        tags: [tags, setTags],
    } = useContext(GlobalContext);
    const { classes } = useStyles({
        floating: edit,
        width: width,
    });

    const saveMemoHandler = () => {
        fetch("http://localhost:8080/api/memo", {
            method: "POST",
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memo),
        }).then((response) => {
            saveAfter();
        });
    };

    const addTagHandler = async (name) => {
        fetch(`http://localhost:8080/api/tag?name=${name}`, {
            method: "POST",
            headers: {
                accept: "*/*",
                "content-type": "application/x-www-form-urlencoded",
            },
        })
            .then((result) => result.json())
            .then((result) => {
                setTags([...tags, result]);
                tagIdsHandler.append(result.value);
            });
    };

    return (
        <Group className={classes.editor} position="right">
            <TextInput
                label="添加"
                required
                classNames={classes}
                value={memo.title}
                onChange={(event) =>
                    setMemo({ title: event.currentTarget.value })
                }
                mt="md"
                autoComplete="nope"
            />
            {edit ? (
                <>
                    <Editor memo={memo} setMemo={setMemo} height={height} />
                    <MultiSelect
                        data={tags}
                        value={memo.tagIds}
                        placeholder="选择标签"
                        searchable
                        creatable
                        clearable
                        getCreateLabel={(query) => `+ 创建 ${query}`}
                        maxSelectedValues={10}
                        onCreate={(query) => {
                            addTagHandler(query);
                        }}
                        onChange={(value) => {
                            setMemo({ tagIds: value });
                        }}
                    />
                    <Button
                        className={classes.control}
                        onClick={saveMemoHandler}
                    >
                        保存
                    </Button>
                </>
            ) : undefined}
        </Group>
    );
}
