import { createStyles, rem } from "@mantine/core";

export default createStyles((theme, { width }) => ({
    editor: {
        backgroundColor: "theme.white",
        width: width,
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
}));
