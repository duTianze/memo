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
        flexBasis: "260px",
    },
    content: {
        flexGrow: 1,
        flexShrink: 3,
        flexBasis: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "8px",
    },
    scrollArea: {
        overflowY: "scroll",
        overflowX: "hidden",
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
        "::-webkit-scrollbar": { WebkitAppearance: "none", width: "10px" },
        "::-webkit-scrollbar-thumb": {
            borderRadius: "5px",
            backgroundColor: "rgba(0,0,0,.5)",
            WebkitBoxShadow: "0 0 1px rgba(255,255,255,.5)",
        },
    },
}));
