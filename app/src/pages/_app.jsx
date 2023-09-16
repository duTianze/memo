import { useEffect, useState } from "react";
import NextApp from "next/app";
import Header from "@/layout/Header";
import { createStyles } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Head from "next/head";
import "./globals.css";
import GlobalContext from "./global-context";
import Channel from "@/components/Channel";

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
    const [reload, setReload] = useState(false);
    const [channelId, setChannelId] = useState("empty");
    const [channelOpened, setChannelOpened] = useState(false);
    const { classes } = useStyles();

    return (
        <GlobalContext.Provider
            value={{
                tagId: [tagIds, setTagIds],
                tags: [tags, setTags],
                channel: [channelId, setChannelId],
                channelOpen: [channelOpened, setChannelOpened],
                reload: [reload, setReload],
            }}
        >
            <Head>
                <title>Memo</title>
                <link rel="icon" href="/static/favicon.ico" />
            </Head>
            <Header setChannelOpened={setChannelOpened} />
            <Channel />
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
