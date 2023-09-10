import { createStyles, getStylesRef, rem } from "@mantine/core";

export default createStyles((theme) => {
    const shadowGradientAlpha = 0.03;

    return {
        main: {
            backdropFilter: "blur(2px)",
            background: theme.fn.gradient({
                deg: 180,
                ...{
                    from: theme.fn.rgba(theme.white, 0.75),
                    to: theme.fn.rgba(theme.white, 0.55),
                },
            }),
        },
        header: {
            borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
            paddingBottom: theme.spacing.sm,
            marginBottom: `calc(${theme.spacing.md} * 1.5)`,
            borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
        },

        link: {
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
