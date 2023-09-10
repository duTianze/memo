import { createStyles, getStylesRef, rem, px } from "@mantine/core";

export default createStyles((theme) => ({
    card: {
        flex: "1 0 auto",
        margin: "4px",
        position: "relative",
        height: px(300),
        maxWidth: px(500),
        backgroundColor: theme.colors.gray[0],
        [`&:hover .${getStylesRef("image")}`]: {
            transform: "scale(1.03)",
        },
        cursor: "pointer",
        transition: "transform 150ms ease, box-shadow 150ms ease",
        "&:hover": {
            transform: "scale(1.05)",
            boxShadow: theme.shadows.md,
        },
        [theme.fn.smallerThan("64em")]: {
            maxWidth: px(350),
        },
        [theme.fn.smallerThan("sm")]: {
            maxWidth: px(300),
        },
        [theme.fn.smallerThan("xs")]: {
            maxWidth: px(500),
        },
    },

    image: {
        ...theme.fn.cover(),
        ref: getStylesRef("image"),
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        transition: "transform 500ms ease",
    },

    overlay: {
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
    },

    content: {
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        zIndex: 1,
    },

    title: {
        color: theme.white,
        marginBottom: rem(5),
    },

    bodyText: {
        color: theme.colors.dark[2],
        marginLeft: rem(7),
    },

    author: {
        color: theme.colors.dark[2],
    },
}));
