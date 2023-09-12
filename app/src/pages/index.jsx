import { useState, useEffect, useContext, useRef } from "react";
import { Flex, ScrollArea } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import ImageCard from "@/components/ImageCard";
import MemoEditor from "@/components/MemoEditor";
import useStyles from "./index.styles";
import GlobalContext from "@/pages/global-context";

export default function HomePage() {
    const [posts, postsHandler] = useListState([]);
    const [page, setPage] = useState(0);
    const [last, steLast] = useState(false);
    const { classes } = useStyles();
    const {
        tag: [selectTagId, setSelectTagId],
    } = useContext(GlobalContext);
    const viewport = useRef(null);

    useEffect(() => {
        steLast(false);
        setPage(0);
        postsHandler.setState([]);
        loadPostHanlder(false, 0);
    }, [selectTagId]);

    const loadPostHanlder = (append, page) => {
        fetch(
            `http://localhost:8080/api/post/search?tagId=${selectTagId}&page=${page}`
        )
            .then((response) => response.json())
            .then((result) => {
                if (append) {
                    postsHandler.append(...result.content);
                } else {
                    postsHandler.setState(result.content);
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
            loadPostHanlder(true, page + 1);
        }
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
            <MemoEditor loadPostHanlder={loadPostHanlder} />
            <ScrollArea
                className={classes.scrollArea}
                w="100%"
                h="100%"
                viewportRef={viewport}
                onScrollPositionChange={scrollChangeHanlder}
            >
                <div className={classes.content}>
                    {posts.map((post) => (
                        <ImageCard
                            key={post.id}
                            image={post.backgroundUrl}
                            title={post.title}
                        />
                    ))}
                </div>
            </ScrollArea>
        </Flex>
    );
}
