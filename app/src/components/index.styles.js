import { createStyles, rem } from "@mantine/core";

export default createStyles((theme, { column }) => ({
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
        flexBasis: "240px",
        [theme.fn.smallerThan("sm")]: {
            flexBasis: "40px",
        },
    },
    scrollArea: {
        flex: "1 2 auto",
        overflowY: "scroll",
        overflowX: "hidden",
        height: "auto",
        padding: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    memoGroup: {
        flex: `1 1 calc(100% / ${column})`,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: "4px",
        maxWidth: `500px`,
    },
}));
