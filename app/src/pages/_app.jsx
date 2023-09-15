import { useState } from "react";
import NextApp from "next/app";
import Header from "@/layout/Header";
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
            width: "100%",
        },
    };
});

export default function App(props) {
    const { Component, pageProps } = props;
    const [tags, setTags] = useState([]);
    const [tagIds, setTagIds] = useState([]);
    const [opened, setOpened] = useState(true);
    const { classes } = useStyles();

    return (
        <GlobalContext.Provider
            value={{
                tagId: [tagIds, setTagIds],
                tags: [tags, setTags],
            }}
        >
            <Head>
                <title>Memo</title>
            </Head>
            <Header opened={opened} setOpened={setOpened} />
            <Component className={classes.main} {...pageProps} />
            <Notifications />
        </GlobalContext.Provider>
    );
}

App.getInitialProps = async (appContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
    };
};
