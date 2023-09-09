import { useState, useEffect } from "react";
import {
    Button,
    Card,
    createStyles,
    Flex,
    Group,
    SimpleGrid,
    AspectRatio,
    Text,
    TextInput,
    Image,
    rem,
    MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconReport,
    IconCashBanknote,
    IconCoin,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
const Editor = dynamic(import("@/components/Editor"), { ssr: false });

const useStyles = createStyles((theme, { floating }) => ({
    main: {
        height: "100%",
        width: "100%",
    },
    editor: {
        backgroundColor: theme.white,
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
        width: "100%",
    },
    control: {
        backgroundColor: theme.colors[theme.primaryColor][6],
    },
    content: {
        padding: 0,
        width: "100%",
        height: "100%",
    },
    contentGrid: {
        width: "100%",
        height: "100%",
    },
    card: {
        transition: "transform 150ms ease, box-shadow 150ms ease",
        maxHeight: "200px",
        "&:hover": {
            transform: "scale(1.01)",
            boxShadow: theme.shadows.md,
        },
    },
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 600,
    },

    root: {
        position: "relative",
        width: "100%",
    },
    label: {
        position: "absolute",
        zIndex: 2,
        top: rem(7),
        left: theme.spacing.sm,
        pointerEvents: "none",
        color: floating ? theme.black : theme.colors.gray[5],
        transition:
            "transform 150ms ease, color 150ms ease, font-size 150ms ease",
        transform: floating
            ? `translate(-${theme.spacing.sm}, ${rem(-28)})`
            : "none",
        fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
        fontWeight: floating ? 500 : 400,
    },

    required: {
        transition: "opacity 150ms ease",
        opacity: floating ? 1 : 0,
    },

    input: {
        "&::placeholder": {
            transition: "color 150ms ease",
            color: !floating ? "transparent" : undefined,
        },
    },
}));

export default function HomePage() {
    const [title, setTitle] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [content, setContent] = useState("");
    const [focused, setFocused] = useState(false);
    const [posts, setPosts] = useState([]);
    const [reload, setReload] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [tags, setTags] = useState([
        { value: "react", label: "React" },
        { value: "ng", label: "Angular" },
    ]);

    const { classes, theme } = useStyles({
        floating: title.trim().length !== 0 || focused,
    });

    useEffect(() => {
        setPosts([]);
        fetch("http://localhost:8080/api/post/search")
            .then((response) => response.json())
            .then((result) => {
                setPosts(result.content);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [reload]);

    useEffect(() => {
        setIsEdit(title.length > 0);
    }, [title]);

    const saveHandler = () => {
        fetch("http://localhost:8080/api/post", {
            method: "POST",
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content,
                backgroundImage: backgroundImage,
            }),
        }).then((response) => {
            setTitle("");
            setContent("");
            setBackgroundImage("");
            setReload(!reload);
        });
    };

    const cards = posts.map((post) => (
        <Card
            // withBorder
            shadow="sm"
            key={post.id}
            p="md"
            radius="md"
            component="a"
            href="#"
            className={classes.card}
        >
            <AspectRatio ratio={1920 / 1080}>
                <Image src={post.backgroundImage} />
            </AspectRatio>
            <Text
                color="dimmed"
                size="xs"
                transform="uppercase"
                weight={700}
                mt="md"
            >
                {post.updateTime}
            </Text>
            <Text className={classes.title} mt={5}>
                {post.title}
            </Text>
        </Card>
    ));

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
            <Group className={classes.editor} position="right">
                <TextInput
                    label="标题"
                    required
                    classNames={classes}
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    mt="md"
                    autoComplete="nope"
                />

                {isEdit ? (
                    <>
                        <Editor
                            content={content}
                            setContent={setContent}
                            backgroundImage={backgroundImage}
                            setBackgroundImage={setBackgroundImage}
                            setIsEdit={setIsEdit}
                        />
                        <MultiSelect
                            data={tags}
                            placeholder="选择标签"
                            searchable
                            creatable
                            clearable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            onCreate={(query) => {
                                const item = { value: query, label: query };
                                setTags((current) => [...current, item]);
                                return item;
                            }}
                        />
                        <Button
                            className={classes.control}
                            onClick={saveHandler}
                        >
                            保存
                        </Button>
                    </>
                ) : undefined}
            </Group>

            <Group className={classes.content}>
                <SimpleGrid className={classes.contentGrid} cols={3}>
                    {cards}
                </SimpleGrid>
            </Group>
        </Flex>
    );
}
