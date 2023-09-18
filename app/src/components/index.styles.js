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
        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
        },
    },
    tagNav: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "240px",
        [theme.fn.smallerThan("sm")]: {
            flexBasis: "40px",
        },
    },
    scrollArea: {
        flexGrow: 1,
        flexShrink: 2,
        flexBasis: "auto",
        overflowY: "scroll",
        overflowX: "hidden",
        height: "auto",
        padding: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "stretch",
    },
    memoGroup: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "stretch",
        alignContent: "start",
        margin: "4px",
        maxWidth: "500px",
    },
}));
