import { useContext } from "react";
import {
    Button,
    MultiSelect,
    TextInput,
    Box,
    Space,
    Group,
} from "@mantine/core";
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
    saveAfter,
}) {
    const {
        tags: [tags, setTags],
        filterTags: [filterTags, setFilterTags],
        channel: [channelId, setChannelId],
    } = useContext(GlobalContext);
    const { classes } = useStyles({
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
                setFilterTags([...filterTags, result]);
                setMemo({ tagIds: [...memo.tagIds, result.value] });
            });
    };

    return (
        <Box className={classes.editor}>
            <Group position="right">
                <Button className={classes.control} onClick={saveMemoHandler}>
                    保存
                </Button>
            </Group>

            <TextInput
                required
                classNames={classes}
                value={memo.title}
                onChange={(event) =>
                    setMemo({ title: event.currentTarget.value })
                }
                mt="md"
                autoComplete="nope"
            />
            <Space h="md" />

            <MultiSelect
                data={tags}
                value={memo.tagIds}
                placeholder="选择标签"
                searchable
                creatable
                clearable
                dropdownPosition="bottom"
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

            <Editor memo={memo} setMemo={setMemo} height={height} />
        </Box>
    );
}
