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
            scrollAreaComponent={ScrollArea.Autosize}
        >
            <MemoEditor
                memo={memo}
                setMemo={setMemo}
                height={"100%"}
                width={"100%"}
                saveAfter={() => {
                    saveAfter();
                    close();
                }}
            />
        </Modal>
    );
}
