import { useState, useEffect, useContext, useRef } from "react";
import { Flex, ScrollArea } from "@mantine/core";
import { useListState, useDisclosure, useSetState } from "@mantine/hooks";
import ImageCard from "@/components/ImageCard";
import MemoEditor from "@/components/MemoEditor";
import MemoModal from "@/components/MemoModal";
import useStyles from "./index.styles";
import GlobalContext from "@/pages/global-context";

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
        tagId: [tagId, setTagId],
    } = useContext(GlobalContext);
    const [opened, { open, close }] = useDisclosure(false);
    const [createMemo, setCreateMemo] = useSetState(memoInit);
    const [memo, setMemo] = useSetState(memoInit);
    const [edit, setEdit] = useState(false);
    const viewport = useRef(null);

    useEffect(() => {
        steLast(false);
        setPage(0);
        memosHandler.setState([]);
        loadMemoHanlder(false, 0);
    }, [tagId]);

    useEffect(() => {
        setEdit(createMemo.title.length > 0);
    }, [createMemo.title]);

    const loadMemoHanlder = (append, page) => {
        fetch(
            `http://localhost:8080/api/memo/search?tagId=${tagId}&page=${page}`
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

    const scrollChangeHanlder = ({ x, y }) => {
        if (last) {
            return;
        }
        if (
            viewport.current.offsetHeight + y >=
            viewport.current.scrollHeight
        ) {
            loadMemoHanlder(true, page + 1);
        }
    };

    const cardClickHanlder = (memoId) => {
        fetch(`http://localhost:8080/api/memo/${memoId}`)
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
        <Flex
            className={classes.main}
            mih={50}
            gap="xs"
            justify="center"
            align="center"
            direction="column"
            wrap="nowrap"
        >
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
            <MemoModal
                opened={opened}
                close={close}
                memo={memo}
                setMemo={setMemo}
                saveAfter={() => {
                    loadMemoHanlder(false, 0);
                }}
            />
            <ScrollArea
                className={classes.scrollArea}
                w="100%"
                h="100%"
                viewportRef={viewport}
                onScrollPositionChange={scrollChangeHanlder}
            >
                <div className={classes.content}>
                    {memos.map((memo) => (
                        <ImageCard
                            key={memo.id}
                            background={memo.background}
                            title={memo.title}
                            cardClickHanlder={() => cardClickHanlder(memo.id)}
                        />
                    ))}
                </div>
            </ScrollArea>
        </Flex>
    );
}
