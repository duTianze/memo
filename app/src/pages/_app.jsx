import { useState } from "react";
import NextApp from "next/app";
import Header from "@/layout/Header";
import Navbar from "@/layout/Navbar";
import {
    MantineProvider,
    AppShell,
    createStyles,
    rem,
    Global,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Head from "next/head";
import "./globals.css";

const useStyles = createStyles((theme) => {
    return {
        main: {
            height: "100%",
        },
    };
});

export default function App(props) {
    const { Component, pageProps } = props;
    const [opened, setOpened] = useState(true);
    const { classes } = useStyles();

    return (
        <>
            <Global
                styles={(theme) => ({
                    body: {
                        background: theme.fn.lighten(theme.colors.gray[0], 0.9),
                    },
                    "::-webkit-scrollbar": {
                        width: 12,
                        height: 12,
                        background: theme.colors.gray[3],
                    },
                    "::-webkit-scrollbar-thumb": {
                        background: theme.colors.gray[5],
                        borderRadius: 6,
                        border: `1px solid ${theme.colors.gray[3]}`,
                        "&:hover": {
                            background: theme.colors.gray[6],
                        },
                    },
                    "@-moz-document url-prefix()": {
                        "*": {
                            scrollbarWidth: "thin",
                            scrollbarColor: `${theme.colors.gray[3]} ${theme.colors.gray[5]}`,
                        },
                    },
                })}
            />
            <AppShell
                header={<Header opened={opened} setOpened={setOpened} />}
                navbar={<Navbar opened={opened} />}
                styles={(theme) => ({
                    main: {
                        paddingTop: rem(60),
                        margin: `${rem(10)} 0`,
                        backgroundColor: theme.colors.gray[0],
                    },
                })}
            >
                <Head>
                    <title>Memo</title>
                </Head>
                <MantineProvider
                    theme={{ fontFamily: "Open Sans" }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <Component className={classes.main} {...pageProps} />
                    <Notifications />
                </MantineProvider>
            </AppShell>
        </>
    );
}

App.getInitialProps = async (appContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
    };
};
