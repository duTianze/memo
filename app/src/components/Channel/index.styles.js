import { createStyles, getStylesRef, rem } from "@mantine/core";

export default createStyles((theme) => {
    return {
        main: {},
        content: {
            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        },
        header: {
            padding: 0,
            paddingBottom: theme.spacing.sm,
            marginBottom: "2px",
            borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
        },
        burger: {
            borderRadius: theme.radius.xl,
            ":hover": {
                backgroundColor: "#e6e6e6",
            },
        },
        chip: {
            margin: "2px",
        },
        body: {
            padding: 0,
        },

        link: {
            userSelect: "none",
            ...theme.fn.focusStyles(),
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: theme.fontSizes.sm,
            color: theme.colors.gray[7],
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            borderRadius: theme.radius.xl,
            fontWeight: 500,
            cursor: "pointer",

            "&:hover": {
                backgroundColor: theme.colors.gray[2],
                color: theme.black,

                [`& .${getStylesRef("icon")}`]: {
                    color: theme.black,
                },
            },
        },

        linkIcon: {
            ref: getStylesRef("icon"),
            color: theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },
        linkActive: {
            "&, &:hover": {
                backgroundColor: theme.colors.yellow[2],
                color: theme.fn.variant({
                    variant: "light",
                    color: theme.primaryColor,
                }).color,
                [`& .${getStylesRef("icon")}`]: {
                    color: theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                    }).color,
                },
            },
        },
    };
});
