import { useContext } from "react";
import { useDisclosure, useSetState } from "@mantine/hooks";
import { Header, Autocomplete, Group, Container, Burger } from "@mantine/core";
import { IconSearch, IconBallpen } from "@tabler/icons-react";
import MemoModal from "@/components/MemoModal";
import useStyles from "./Header.styles";
import GlobalContext from "@/pages/global-context";

const memoInit = {
    title: "",
    content: "",
    background: "",
    tagIds: [],
};

export default ({ setChannelOpened }) => {
    const { classes, theme } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);
    const [memo, setMemo] = useSetState({});
    const {
        reload: [reload, setReload],
    } = useContext(GlobalContext);

    const createMemoHandler = () => {
        setMemo(memoInit);
        open();
    };

    return (
        <Header className={classes.main}>
            <Container className={classes.header} fluid>
                <Group>
                    <Burger
                        className={classes.burger}
                        onClick={() => setChannelOpened(true)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                    <IconBallpen
                        className={classes.icon}
                        size={28}
                        onClick={createMemoHandler}
                    />
                </Group>

                <Group>
                    <Autocomplete
                        placeholder="Search"
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                        data={["React", "Angular", "Vue"]}
                    />
                </Group>
            </Container>
            <MemoModal
                opened={opened}
                close={close}
                memo={memo}
                setMemo={setMemo}
                saveAfter={() => {
                    setReload(!reload);
                }}
            />
        </Header>
    );
};
