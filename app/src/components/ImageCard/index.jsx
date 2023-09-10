import { IconEye, IconMessageCircle } from "@tabler/icons-react";
import { Card, Text, Group, Center } from "@mantine/core";
import useStyles from "./index.styles";

export default function ImageCard({ image, title }) {
    const { classes, theme } = useStyles();

    return (
        <Card
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            component="a"
            // href={link}
            target="_blank"
        >
            <div
                className={classes.image}
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className={classes.overlay} />
            <div className={classes.content}>
                <div>
                    <Text size="sm" className={classes.title} weight={500}>
                        {title}
                    </Text>

                    <Group position="apart" spacing="xs">
                        <Text size="xs" className={classes.author}>
                            author
                        </Text>

                        <Group spacing="lg">
                            <Center>
                                <IconEye
                                    size="1rem"
                                    stroke={1.5}
                                    color={theme.colors.dark[2]}
                                />
                                <Text size="xs" className={classes.bodyText}>
                                    views
                                </Text>
                            </Center>
                            <Center>
                                <IconMessageCircle
                                    size="1rem"
                                    stroke={1.5}
                                    color={theme.colors.dark[2]}
                                />
                                <Text size="xs" className={classes.bodyText}>
                                    comments
                                </Text>
                            </Center>
                        </Group>
                    </Group>
                </div>
            </div>
        </Card>
    );
}
