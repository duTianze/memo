import { createStyles, getStylesRef, rem, px } from "@mantine/core";

export default createStyles((theme) => ({
    card: {
        backgroundColor: theme.colors.gray[0],
        marginBottom: "4px",
        cursor: "pointer",
        transition: "transform 150ms ease, box-shadow 150ms ease",
        "&:hover": {
            transform: "scale(1.05)",
            boxShadow: theme.shadows.md,
        },
    },
}));
