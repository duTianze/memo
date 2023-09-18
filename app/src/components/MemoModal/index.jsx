import { useContext, useState, useEffect } from "react";
import { Modal, ScrollArea } from "@mantine/core";
import useStyles from "./index.styles";
import MemoEditor from "@/components/MemoEditor";
import GlobalContext from "@/pages/global-context";

export default function MemoModal({ opened, close, memo, setMemo, saveAfter }) {
    const { classes, theme } = useStyles();
    const [changCount, setChangCount] = useState(-1);

    const {
        tags: [tags, setTags],
        filterTags: [filterTags, setFilterTags],
        channel: [channelId, setChannelId],
    } = useContext(GlobalContext);

    useEffect(() => {
        setChangCount((current) => current + 1);
    }, [memo.title, memo.background, memo.content, memo.rate, memo.tagIds]);

    const saveMemoHandler = () => {
        if (changCount < 2 || memo.isDelete) {
            setChangCount(0);
            close();
            return;
        }
        fetch(`http://localhost:12190/api/${channelId}/memo`, {
            method: "POST",
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memo),
        }).then((response) => {
            saveAfter();
            setChangCount(0);
            close();
        });
    };

    const deleteTagHandler = async (name) => {
        if (memo.id == undefined) {
            return;
        }
        fetch(`http://localhost:12190/api/${channelId}/memo/${memo.id}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
            },
        }).then((result) => {
            setMemo({ isDelete: true });
            saveAfter();
            close();
        });
    };

    return (
        <Modal
            className={classes.modal}
            size="90%"
            opened={opened}
            onClose={saveMemoHandler}
            centered
            withCloseButton={false}
            radius="lg"
            scrollAreaComponent={ScrollArea.Autosize}
        >
            <MemoEditor
                memo={memo}
                setMemo={setMemo}
                height={"100%"}
                width={"100%"}
                deleteTagHandler={deleteTagHandler}
            />
        </Modal>
    );
}
