import { createStyles, rem } from "@mantine/core";

export default createStyles((theme, { floating, width }) => ({
    editor: {
        backgroundColor: theme.white,
        paddingTop: 0,
        paddingBottom: theme.spacing.md,
        width: floating ? width : "30%",
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
        boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 1px 1px, rgb(51, 51, 51) 0px 0px 0px 1px",
    },
    control: {
        backgroundColor: theme.colors[theme.primaryColor][6],
    },
}));
