import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => {
    const shadowGradientAlpha = 0.03;

    return {
        main: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "50px",
            zIndex: 10,
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
            backdropFilter: "blur(2px)",
            background: theme.fn.gradient({
                deg: 180,
                ...{
                    from: theme.fn.rgba(theme.white, 0.95),
                    to: theme.fn.rgba(theme.white, 0.75),
                },
            }),
            "&::after": {
                position: "absolute",
                content: '""',
                left: 0,
                right: 0,
                background: `linear-gradient(${theme.fn.rgba(
                    theme.black,
                    shadowGradientAlpha
                )}, ${theme.fn.rgba(
                    theme.black,
                    0
                )}), linear-gradient(${theme.fn.rgba(
                    theme.black,
                    shadowGradientAlpha
                )}, ${theme.fn.rgba(theme.black, 0)} 30%)`,
                opacity: 0,
                transition: "opacity .15s ease",
            },
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
        },
        burger: {
            borderRadius: theme.radius.xl,
            ":hover": {
                backgroundColor: "#e6e6e6",
            },
        },
    };
});
