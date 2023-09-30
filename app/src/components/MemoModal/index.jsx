import { useContext } from "react";
import { Modal, ScrollArea } from "@mantine/core";
import useStyles from "./index.styles";
import MemoEditor from "@/components/MemoEditor";
import GlobalContext from "@/components/GlobalContext";

export default function MemoModal({ opened, close, memo, setMemo, saveAfter }) {
    const { classes } = useStyles();

    const {
        tags: [tags, setTags],
        filterTags: [filterTags, setFilterTags],
        channel: [channelId, setChannelId],
    } = useContext(GlobalContext);

    return (
        <Modal
            className={classes.modal}
            size="90%"
            opened={opened}
            onClose={close}
            centered
            withCloseButton={false}
            radius="lg"
            styles={{
                content: {
                    overflowY: "hidden !important",
                    maxHeight: "calc(100vh - 8px) !important",
                },
                inner: {
                    paddingTop: "4px !important",
                    paddingBottom: "4px !important",
                    paddingLeft: "0 !important",
                    paddingRight: "0 !important",
                },
            }}
        >
            <MemoEditor
                memo={memo}
                setMemo={setMemo}
                saveAfter={() => {
                    saveAfter();
                    close();
                }}
            />
        </Modal>
    );
}
