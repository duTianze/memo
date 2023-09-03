import {
    createStyles,
    Header,
    Autocomplete,
    Group,
    Burger,
    Container,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconBallpen } from "@tabler/icons-react";

const useStyles = createStyles((theme) => {
    const shadowGradientAlpha = theme.colorScheme === "dark" ? 0.3 : 0.03;

    return {
        main: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            padding: theme.spacing.xs,
            height: rem(60),
            zIndex: 10,
            borderBottom: `1px solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[2]
            }`,
            backdropFilter: "blur(2px)",
            background: theme.fn.gradient({
                deg: 180,
                ...(theme.colorScheme === "dark"
                    ? {
                          from: theme.fn.rgba(theme.colors.dark[7], 0.95),
                          to: theme.fn.rgba(theme.colors.dark[7], 0.75),
                      }
                    : {
                          from: theme.fn.rgba(theme.white, 0.95),
                          to: theme.fn.rgba(theme.white, 0.75),
                      }),
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

export default ({ opened, setOpened }) => {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    return (
        <Header mb={120} className={classes.main}>
            <Container className={classes.header} fluid>
                <Group>
                    <Burger
                        className={classes.burger}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                    <IconBallpen size={28} />
                </Group>

                <Group>
                    <Autocomplete
                        placeholder="Search"
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                        data={["React", "Angular", "Vue"]}
                    />
                </Group>
            </Container>
        </Header>
    );
};
