import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
    main: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "stretch",
        top: "50px",
        height: "calc(100vh - 50px)",
    },
    tagNav: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "260px",
    },
    content: {
        flexGrow: 1,
        flexShrink: 3,
        flexBasis: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    },
    scrollArea: {
        overflowY: "auto",
        height: "auto",
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
}));
