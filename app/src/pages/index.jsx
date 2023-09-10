import { useState, useEffect } from "react";
import { Flex, Group, SimpleGrid } from "@mantine/core";
import ImageCard from "@/components/ImageCard";
import MemoEditor from "@/components/MemoEditor";
import useStyles from "./index.styles";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const { classes } = useStyles();

    useEffect(() => {
        loadPostHanlder();
    }, []);

    const loadPostHanlder = () => {
        fetch("http://localhost:8080/api/post/search")
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

            <Group className={classes.content}>
                <SimpleGrid
                    className={classes.contentGrid}
                    cols={5}
                    breakpoints={[
                        { maxWidth: "lg", cols: 4, spacing: "lg" },
                        { maxWidth: "md", cols: 3, spacing: "md" },
                        { maxWidth: "sm", cols: 2, spacing: "sm" },
                        { maxWidth: "xs", cols: 1, spacing: "xs" },
                    ]}
                >
                    {posts.map((post) => (
                        <ImageCard
                            key={post.id}
                            image={post.image}
                            title={post.title}
                        />
                    ))}
                </SimpleGrid>
            </Group>
        </Flex>
    );
}
