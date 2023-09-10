import { useState, useEffect, useContext } from "react";
import { Flex } from "@mantine/core";
import ImageCard from "@/components/ImageCard";
import MemoEditor from "@/components/MemoEditor";
import useStyles from "./index.styles";
import GlobalContext from "@/pages/global-context";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const { classes } = useStyles();
    const {
        tag: [selectTagId, setSelectTagId],
    } = useContext(GlobalContext);

    useEffect(() => {
        loadPostHanlder();
    }, [selectTagId]);

    const loadPostHanlder = () => {
        fetch(`http://localhost:8080/api/post/search?tagId=${selectTagId}`)
            .then((response) => response.json())
            .then((result) => {
                setPosts(result.content);
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
            <MemoEditor loadPostHanlder={loadPostHanlder} />
            <div className={classes.content}>
                {posts.map((post) => (
                    <ImageCard
                        key={post.id}
                        image={post.image}
                        title={post.title}
                    />
                ))}
            </div>
        </Flex>
    );
}
