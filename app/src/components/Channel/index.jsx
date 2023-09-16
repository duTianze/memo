import { useState, useEffect, useContext } from "react";
import { useRouter, useParams } from "next/router";
import {
    Drawer,
    Group,
    ActionIcon,
    Burger,
    Divider,
    Menu,
    TextInput,
    Button,
    Modal,
} from "@mantine/core";
import useStyles from "./index.styles";
import {
    IconTags,
    IconBallpen,
    IconPlus,
    IconTrash,
    IconBookmarkEdit,
} from "@tabler/icons-react";
import GlobalContext from "@/pages/global-context";

export default function Channel({}) {
    const router = useRouter();
    const { classes, theme, cx } = useStyles();
    const [channels, setChannels] = useState([]);
    const [dialogOpened, setDialogOpened] = useState(false);
    const [newName, setNewName] = useState("");
    const {
        channel: [channelId, setChannelId],
        channelOpen: [channelOpened, setChannelOpened],
    } = useContext(GlobalContext);

    useEffect(() => {
        loadChannels();
        const hash = window.location.hash.split("#")[1];
        if (hash) {
            setChannelId(window.location.hash.split("#")[1]);
        }
    }, [useParams]);

    const loadChannels = () => {
        fetch(`http://localhost:8080/api/channel`)
            .then((response) => response.json())
            .then((result) => {
                setChannels(result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const addChannel = () => {
        fetch("http://localhost:8080/api/channel?name=未命名", {
            method: "POST",
            headers: {
                accept: "*/*",
                "content-type": "application/x-www-form-urlencoded",
            },
        }).then(() => {
            loadChannels();
        });
    };

    const deleteChannel = () => {
        fetch(`http://localhost:8080/api/channel/${channelId}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
            },
        }).then(() => {
            loadChannels();
        });
    };

    const renameChannel = () => {
        fetch(
            `http://localhost:8080/api/channel/${channelId}?name=${newName}`,
            {
                method: "PUT",
                headers: {
                    accept: "*/*",
                },
            }
        ).then(() => {
            setNewName("");
            setDialogOpened(false);
            loadChannels();
        });
    };

    return (
        <Drawer.Root
            opened={channelOpened}
            onClose={() => setChannelOpened(false)}
            size={160}
            className={classes.main}
        >
            <Drawer.Overlay />
            <Drawer.Content className={classes.content}>
                <Drawer.Header className={classes.header}>
                    <Group>
                        <Burger
                            className={classes.burger}
                            onClick={() => setChannelOpened(false)}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="xl"
                        />
                        <IconBallpen size={28} />
                    </Group>
                </Drawer.Header>
                <Drawer.Body
                    className={classes.body}
                    color={theme.colors.gray[6]}
                >
                    <Group position="right">
                        <ActionIcon
                            size="md"
                            radius="xl"
                            variant="transparent"
                            sx={{
                                marginTop: "12px",
                            }}
                            onClick={addChannel}
                        >
                            <IconPlus size={28} />
                        </ActionIcon>
                    </Group>
                    <Modal
                        opened={dialogOpened}
                        onClose={() => setDialogOpened(false)}
                        radius="md"
                        withCloseButton={false}
                        centered
                    >
                        <Group align="flex-end">
                            <TextInput
                                placeholder="输入新的频道名"
                                sx={{ flex: 1 }}
                                value={newName}
                                onChange={(event) =>
                                    setNewName(event.currentTarget.value)
                                }
                            />
                            <Button onClick={renameChannel}>确认</Button>
                        </Group>
                    </Modal>
                    <Divider my="sm" />
                    {channels.map((channel) => (
                        <a
                            key={channel.id}
                            className={cx(classes.link, {
                                [classes.linkActive]: channel.id === channelId,
                            })}
                            onClick={(event) => {
                                event.preventDefault();
                                setChannelId(channel.id);
                                router.push(`/#${channel.id}`);
                            }}
                        >
                            <Menu
                                position="bottom"
                                transitionProps={{
                                    transition: "scale-y",
                                    duration: 150,
                                }}
                            >
                                <Menu.Target>
                                    <IconTags
                                        className={classes.linkIcon}
                                        stroke={1.5}
                                    />
                                </Menu.Target>
                                <Menu.Dropdown
                                    disabled={channel.id === channelId}
                                >
                                    <Menu.Item
                                        icon={<IconBookmarkEdit size={14} />}
                                        onClick={() => setDialogOpened(true)}
                                    >
                                        编辑
                                    </Menu.Item>

                                    <Menu.Item
                                        color="red"
                                        icon={<IconTrash size={14} />}
                                        onClick={deleteChannel}
                                    >
                                        删除
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                            <span>{channel.name}</span>
                        </a>
                    ))}
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    );
}
