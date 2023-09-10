import { useState, useEffect, useContext } from "react";
import { Navbar, rem } from "@mantine/core";
import { IconTags } from "@tabler/icons-react";
import GlobalContext from "@/pages/global-context";
import useStyles from "./Navbar.styles";

export default ({ opened }) => {
    const { classes, cx } = useStyles();
    const [tags, setTags] = useState([]);
    const [activeId, setActiveId] = useState();
    const global = useContext(GlobalContext);

    useEffect(() => {
        setTags([]);
        fetch("http://localhost:8080/api/tag")
            .then((response) => response.json())
            .then((result) => {
                setTags(result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [global.navReload]);

    return opened ? (
        <Navbar
            width={{ sm: 100 }}
            sx={(theme) => ({
                top: rem(60),
                maxWidth: 200,
            })}
            className={classes.main}
        >
            <Navbar.Section
                grow
                sx={(theme) => ({
                    padding: "10px",
                })}
            >
                {tags.map((item) => (
                    <a
                        className={cx(classes.link, {
                            [classes.linkActive]: item.id === activeId,
                        })}
                        href={item.link}
                        key={item.id}
                        onClick={(event) => {
                            event.preventDefault();
                            if (activeId == item.id) {
                                setActiveId(undefined);
                            } else {
                                setActiveId(item.id);
                            }
                        }}
                    >
                        <IconTags className={classes.linkIcon} stroke={1.5} />
                        <span>{item.name}</span>
                    </a>
                ))}
            </Navbar.Section>
        </Navbar>
    ) : undefined;
};
