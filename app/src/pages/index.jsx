import { useState, useEffect, useContext, useRef } from "react";
import { Box } from "@mantine/core";
import {
    useListState,
    useDisclosure,
    useSetState,
    useWindowEvent,
    useElementSize,
} from "@mantine/hooks";
import ImageCard from "@/components/ImageCard";
import MemoModal from "@/components/MemoModal";
import useStyles from "../components/index.styles";
import GlobalContext from "@/components/GlobalContext";
import Tag from "@/components/Tag";

export default function HomePage() {
    const [memos, memosHandler] = useListState([]);
    const [page, setPage] = useState(0);
    const [last, steLast] = useState(false);
    const [column, setColumn] = useState(5);
    const { classes } = useStyles({ column });
    const {
        tagId: [tagIds, setTagIds],
        channel: [channelId, setChannelId],
        reload: [reload, setReload],
    } = useContext(GlobalContext);
    const [opened, { open, close }] = useDisclosure(false);
    const [memo, setMemo] = useSetState({});
    const [memoGroup, setMemoGroup] = useState([]);
    const { ref, width, height } = useElementSize();

    const resizeHandler = () => {
        if (window.innerWidth <= 576) {
            setColumn(1);
        } else if (window.innerWidth <= 768) {
            setColumn(2);
        } else if (window.innerWidth <= 992) {
            setColumn(3);
        } else if (window.innerWidth <= 1200) {
            setColumn(4);
        } else {
            setColumn(5);
        }
    };
    useWindowEvent("resize", resizeHandler);
    useEffect(() => {
        resizeHandler();
    }, []);

    useEffect(() => {
        setPage(0);
        memosHandler.setState([]);
        loadMemoHanlder(false, 0);
    }, [reload, channelId, tagIds]);

    useEffect(() => {
        setMemoGroup(
            memos.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index % column);

                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [];
                }
                resultArray[chunkIndex].push(item);
                return resultArray;
            }, [])
        );
    }, [column, memos]);

    const loadMemoHanlder = (append, page) => {
        steLast(true);
        fetch(`/api/${channelId}/memo/search?tagIds=${tagIds}&page=${page}`)
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
        if (
            event.currentTarget.scrollTop +
                event.currentTarget.clientHeight +
                5 >=
            event.currentTarget.scrollHeight
        ) {
            if (last) {
                return;
            }
            loadMemoHanlder(true, page + 1);
        }
    };

    const cardClickHanlder = (memoId) => {
        fetch(`/api/${channelId}/memo/${memoId}`)
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
            <Box
                ref={ref}
                className={classes.scrollArea}
                onScroll={handleScroll}
            >
                {memoGroup.map((group, index) => (
                    <div key={index} className={classes.memoGroup}>
                        {group.map((memo) => (
                            <ImageCard
                                key={memo.id}
                                memo={memo}
                                width={width / column - 8}
                                cardClickHanlder={() =>
                                    cardClickHanlder(memo.id)
                                }
                            />
                        ))}
                    </div>
                ))}
            </Box>
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
