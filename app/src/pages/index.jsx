import { useState, useEffect, useContext, useRef } from "react";
import { Flex, ScrollArea } from "@mantine/core";
import ImageCard from "@/components/ImageCard";
import MemoEditor from "@/components/MemoEditor";
import useStyles from "./index.styles";
import GlobalContext from "@/pages/global-context";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const { classes } = useStyles();
    const {
        tag: [selectTagId, setSelectTagId],
    } = useContext(GlobalContext);
    const viewport = useRef(null);

    useEffect(() => {
        loadPostHanlder();
    }, [selectTagId, page]);

    const loadPostHanlder = () => {
        fetch(
            `http://localhost:8080/api/post/search?tagId=${selectTagId}&page=${page}`
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.content.length > 0) {
                    console.log(result.content);
                    setPosts(posts.concat(result.content));
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const scrollChangeHanlder = ({ x, y }) => {
        if (
            viewport.current.offsetHeight + y >=
            viewport.current.scrollHeight
        ) {
            setPage(page + 1);
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
                            image={post.image}
                            title={post.title}
                        />
                    ))}
                </div>
            </ScrollArea>
        </Flex>
    );
}
