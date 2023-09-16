import { useContext } from "react";
import { Button, MultiSelect, TextInput, Group } from "@mantine/core";
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
        channelId,
    } = useContext(GlobalContext);
    const { classes } = useStyles({
        floating: edit,
        width: width,
    });

    const saveMemoHandler = () => {
        fetch(`http://localhost:8080/api/${channelId}/memo`, {
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
        fetch(`http://localhost:8080/api/${channelId}/tag?name=${name}`, {
            method: "POST",
            headers: {
                accept: "*/*",
                "content-type": "application/x-www-form-urlencoded",
            },
        })
            .then((result) => result.json())
            .then((result) => {
                setTags([...tags, result]);
                setMemo({ tagIds: [...memo.tagIds, result.value] });
            });
    };

    return (
        <div className={classes.editor}>
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
                        dropdownPosition="top"
                        transitionProps={{
                            duration: 150,
                            transition: "pop-top-left",
                            timingFunction: "ease",
                        }}
                        radius="xl"
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
        </div>
    );
}
