import { useContext } from "react";
import {
    Button,
    MultiSelect,
    TextInput,
    Box,
    Space,
    Group,
    Rating,
    Popover,
    Container,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import dynamic from "next/dynamic";
import useStyles from "./index.styles";
import GlobalContext from "@/components/GlobalContext";

const Editor = dynamic(import("@/components/MemoEditor/Editor"), {
    ssr: false,
});

export default function MemoEditor({ memo, setMemo, saveAfter }) {
    const {
        tags: [tags, setTags],
        filterTags: [filterTags, setFilterTags],
        channel: [channelId, setChannelId],
    } = useContext(GlobalContext);
    const { ref, width, height } = useElementSize();

    const { classes } = useStyles();

    const addTagHandler = async (name) => {
        fetch(`/api/${channelId}/tag?name=${name}`, {
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
    const saveMemoHandler = () => {
        fetch(`/api/${channelId}/memo`, {
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

    const deleteTagHandler = async (name) => {
        fetch(`/api/${channelId}/memo/${memo.id}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
            },
        }).then((result) => {
            saveAfter();
        });
    };

    return (
        <Box className={classes.editor}>
            <div ref={ref}>
                <Group position="apart">
                    <TextInput
                        required
                        classNames={classes.titleInput}
                        value={memo.title}
                        onChange={(event) =>
                            setMemo({ title: event.currentTarget.value })
                        }
                        mt="md"
                        autoComplete="nope"
                        styles={{
                            root: {
                                flex: "1 1 auto",
                                margin: "0 !important",
                            },
                        }}
                    />
                    <Group
                        position="right"
                        style={{
                            position: "sticky",
                            top: 0,
                            height: "30px",
                            zIndex: 100,
                            backgroundColor: "white",
                        }}
                    >
                        <Rating
                            value={memo.rate}
                            onChange={(value) => {
                                setMemo({ rate: value });
                            }}
                        />
                        <Popover position="bottom" withArrow shadow="md">
                            <Popover.Target>
                                <Button color="red" radius="xl" compact>
                                    删除
                                </Button>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Button
                                    color="red"
                                    radius="xl"
                                    compact
                                    onClick={deleteTagHandler}
                                >
                                    确定删除
                                </Button>
                            </Popover.Dropdown>
                        </Popover>

                        <Button
                            color="indigo"
                            radius="xl"
                            compact
                            onClick={saveMemoHandler}
                        >
                            保存
                        </Button>
                    </Group>
                </Group>
                <Space h="xs" />
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
            </div>
            <Editor headerHeight={height} memo={memo} setMemo={setMemo} />
        </Box>
    );
}
