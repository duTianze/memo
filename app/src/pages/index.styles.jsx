import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
    main: {
        height: "100%",
        width: "100%",
    },
    content: {
        padding: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "stretch",
        alignContent: "start",
    },
    contentGrid: {
        width: "100%",
        height: "100%",
    },
}));
