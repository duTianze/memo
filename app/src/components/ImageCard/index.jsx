import { useEffect, useState } from "react";
import { Card, Text, Group, Box, Image, Rating } from "@mantine/core";
import useStyles from "./index.styles";
import { useHover, useInterval } from "@mantine/hooks";

export default function ImageCard({ memo, cardClickHanlder }) {
    const { classes } = useStyles();
    const { hovered, ref } = useHover();
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const interval = useInterval(
        () =>
            setBackgroundIndex(
                (current) => (current + 1) % memo.background.length
            ),
        500
    );

    useEffect(() => {
        if (!hovered || memo.background.length == 1) {
            return;
        }
        interval.start();
        return () => {
            interval.stop();
            setBackgroundIndex(0);
        };
    }, [hovered]);

    return (
        <Card
            className={classes.card}
            withBorder
            padding="sm"
            radius="md"
            shadow="lg"
            onClick={cardClickHanlder}
        >
            <Card.Section ref={ref}>
                <Image src={memo.background[backgroundIndex]} />
            </Card.Section>

            <Box>
                <Group position="apart" mt="lg">
                    <Text weight={500} fz="sm">
                        {memo.title}
                    </Text>

                    <Group spacing={5} position="right">
                        <Rating value={memo.rate} readOnly />
                    </Group>
                </Group>
                <Text fz="sm" c="dimmed" mt="sm">
                    {memo.spoiler}
                </Text>
            </Box>
        </Card>
    );
}
