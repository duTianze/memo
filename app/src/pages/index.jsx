import { useState } from "react";
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

const mockdata = [
    {
        title: "Top 10 places to visit in Norway this summer",
        image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        date: "August 18, 2022",
    },
    {
        title: "Best forests to visit in North America",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        date: "August 27, 2022",
    },
    {
        title: "Hawaii beaches review: better than you think",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        date: "September 9, 2022",
    },
    {
        title: "Mountains at night: 12 best locations to enjoy the view",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        date: "September 12, 2022",
    },
    {
        title: "Bx23",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        date: "August 27, 2022",
    },
    {
        title: "Ha32134you think",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        date: "September 9, 2022",
    },
    {
        title: "Moun34cations to enjoy the view",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        date: "September 12, 2022",
    },
];

const useStyles = createStyles((theme, { floating }) => ({
    main: {
        height: "100%",
        width: "100%",
    },
    editor: {
        backgroundColor: theme.white,
        padding: theme.spacing.xl,
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
    const [content, setContent] = useState("");
    const [focused, setFocused] = useState(false);
    const [tags, setTags] = useState([
        { value: "react", label: "React" },
        { value: "ng", label: "Angular" },
    ]);

    const { classes, theme } = useStyles({
        floating: title.trim().length !== 0 || focused,
    });

    const cards = mockdata.map((article) => (
        <Card
            // withBorder
            shadow="sm"
            key={article.title}
            p="md"
            radius="md"
            component="a"
            href="#"
            className={classes.card}
        >
            <AspectRatio ratio={1920 / 1080}>
                <Image src={article.image} />
            </AspectRatio>
            <Text
                color="dimmed"
                size="xs"
                transform="uppercase"
                weight={700}
                mt="md"
            >
                {article.date}
            </Text>
            <Text className={classes.title} mt={5}>
                {article.title}
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
                <Editor content={content} setContent={setContent} />
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
                    onClick={(values) => console.log(values)}
                >
                    保存
                </Button>
            </Group>

            <Group className={classes.content}>
                <SimpleGrid className={classes.contentGrid} cols={3}>
                    {cards}
                </SimpleGrid>
            </Group>
        </Flex>
    );
}
