import { useState, useEffect, useContext } from "react";
import { Navbar, rem } from "@mantine/core";
import { IconTags } from "@tabler/icons-react";
import GlobalContext from "@/pages/global-context";
import useStyles from "./Navbar.styles";

export default ({ opened }) => {
    const { classes, cx } = useStyles();
    const [tags, setTags] = useState([]);
    const {
        nav: [navReload, setNavReload],
        tag: [selectTagId, setSelectTagId],
    } = useContext(GlobalContext);

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
    }, [navReload]);

    return opened ? (
        <Navbar
            width={{ sm: 200 }}
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
                        key={item.id}
                        className={cx(classes.link, {
                            [classes.linkActive]: item.id === selectTagId,
                        })}
                        href={item.link}
                        onClick={(event) => {
                            event.preventDefault();
                            setSelectTagId(
                                selectTagId === item.id ? "" : item.id
                            );
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
