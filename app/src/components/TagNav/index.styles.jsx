import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => {
    return {
        main: {},
        content: {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
            padding: "8px",
        },
        chip: {
            margin: "2px",
        },
    };
});
