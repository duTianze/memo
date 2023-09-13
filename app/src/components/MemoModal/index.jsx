import { Modal } from "@mantine/core";
import useStyles from "./index.styles";
import MemoEditor from "@/components/MemoEditor";

export default function MemoModal({ opened, close, memo, setMemo, saveAfter }) {
    const { classes } = useStyles();

    return (
        <Modal
            className={classes.modal}
            size="90%"
            opened={opened}
            onClose={close}
            title="查看"
            centered
        >
            {opened ? (
                <MemoEditor
                    memo={memo}
                    setMemo={setMemo}
                    height={"calc(100vh * 2 / 3)"}
                    width={"100%"}
                    edit={true}
                    saveAfter={() => {
                        saveAfter();
                        close();
                    }}
                />
            ) : undefined}
        </Modal>
    );
}
