import { IconStar } from "@tabler/icons-react";
import { Card, Text, Group, Box, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import useStyles from "./index.styles";

export default function ImageCard({
    background,
    title,
    content,
    cardClickHanlder,
}) {
    const { classes } = useStyles();

    return (
        <Card
            className={classes.card}
            withBorder
            padding="sm"
            radius="md"
            shadow="lg"
        >
            <Card.Section>
                <Carousel
                    withIndicators
                    loop
                    classNames={{
                        root: classes.carousel,
                        controls: classes.carouselControls,
                        indicator: classes.carouselIndicator,
                    }}
                >
                    <Carousel.Slide>
                        <Image src={background} onClick={cardClickHanlder} />
                    </Carousel.Slide>
                </Carousel>
            </Card.Section>

            <Box onClick={cardClickHanlder}>
                <Group position="apart" mt="lg">
                    <Text weight={500} fz="sm">
                        {title}
                    </Text>

                    <Group spacing={5}>
                        <IconStar size="1rem" />
                        <Text fz="xs" fw={500}>
                            4.78
                        </Text>
                    </Group>
                </Group>
                <Text fz="sm" c="dimmed" mt="sm"></Text>
            </Box>
        </Card>
    );
}
