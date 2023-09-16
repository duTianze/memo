import { useState, useEffect, useContext, useRef } from "react";
import { Group, ScrollArea, Box } from "@mantine/core";
import { useListState, useDisclosure, useSetState } from "@mantine/hooks";
import ImageCard from "@/components/ImageCard";
import MemoEditor from "@/components/MemoEditor";
import MemoModal from "@/components/MemoModal";
import useStyles from "./index.styles";
import GlobalContext from "@/pages/global-context";
import Tag from "@/components/Tag";

const memoInit = {
    title: "",
    content: "",
    background: "",
    tagIds: [],
};

export default function HomePage() {
    const [memos, memosHandler] = useListState([]);
    const [page, setPage] = useState(0);
    const [last, steLast] = useState(false);
    const { classes } = useStyles();
    const {
        tagId: [tagIds, setTagIds],
        channelId,
    } = useContext(GlobalContext);
    const [opened, { open, close }] = useDisclosure(false);
    const [createMemo, setCreateMemo] = useSetState(memoInit);
    const [memo, setMemo] = useSetState(memoInit);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        steLast(false);
        setPage(0);
        memosHandler.setState([]);
        loadMemoHanlder(false, 0);
    }, [tagIds]);

    useEffect(() => {
        setEdit(createMemo.title.length > 0);
    }, [createMemo.title]);

    const loadMemoHanlder = (append, page) => {
        fetch(
            `http://localhost:8080/api/${channelId}/memo/search?tagIds=${tagIds}&page=${page}`
        )
            .then((response) => response.json())
            .then((result) => {
                if (append) {
                    memosHandler.append(...result.content);
                } else {
                    memosHandler.setState(result.content);
                }
                steLast(result.last);
                setPage(result.number);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleScroll = (event) => {
        if (last) {
            return;
        }
        if (
            event.currentTarget.scrollTop + event.currentTarget.clientHeight ==
            event.currentTarget.scrollHeight
        ) {
            loadMemoHanlder(true, page + 1);
        }
    };

    const cardClickHanlder = (memoId) => {
        fetch(`http://localhost:8080/api/${channelId}/memo/${memoId}`)
            .then((response) => response.json())
            .then((result) => {
                setMemo(result);
                open();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className={classes.main}>
            <div className={classes.tagNav}>
                <Tag />
            </div>
            <div className={classes.content}>
                <MemoEditor
                    memo={createMemo}
                    setMemo={setCreateMemo}
                    height={"calc(100vh * 2 / 3)"}
                    width={"90%"}
                    edit={edit}
                    saveAfter={() => {
                        loadMemoHanlder(false, 0);
                        setCreateMemo(memoInit);
                    }}
                />
                <Box className={classes.scrollArea} onScroll={handleScroll}>
                    {memos.map((memo) => (
                        <ImageCard
                            key={memo.id}
                            background={memo.background}
                            title={memo.title}
                            cardClickHanlder={() => cardClickHanlder(memo.id)}
                        />
                    ))}
                </Box>
            </div>
            <MemoModal
                opened={opened}
                close={close}
                memo={memo}
                setMemo={setMemo}
                saveAfter={() => {
                    loadMemoHanlder(false, 0);
                }}
            />
        </div>
    );
}
