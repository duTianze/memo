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
import GlobalContext from "./global-context";

const useStyles = createStyles((theme) => {
    return {
        main: {
            height: "100%",
        },
    };
});

export default function App(props) {
    const { Component, pageProps } = props;
    const [tags, setTags] = useState([]);
    const [tagId, setTagId] = useState("");
    const [opened, setOpened] = useState(true);
    const { classes } = useStyles();

    return (
        <GlobalContext.Provider
            value={{
                tagId: [tagId, setTagId],
                tags: [tags, setTags],
            }}
        >
            <AppShell
                header={<Header opened={opened} setOpened={setOpened} />}
                navbar={<Navbar opened={opened} />}
                styles={(theme) => ({
                    main: {
                        paddingTop: rem(60),
                        paddingRight: 0,
                        paddingBottom: 0,
                        height: "calc(100vh - 60rem)",
                        backgroundColor: "white",
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
        </GlobalContext.Provider>
    );
}

App.getInitialProps = async (appContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
    };
};
