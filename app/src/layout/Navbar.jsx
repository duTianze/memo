import { useState, useEffect, useContext } from "react";
import { Navbar, rem } from "@mantine/core";
import { IconTags } from "@tabler/icons-react";
import GlobalContext from "@/pages/global-context";
import useStyles from "./Navbar.styles";

export default ({ opened }) => {
    const { classes, cx } = useStyles();
    const {
        tags: [tags, setTags],
        tagId: [tagId, setTagId],
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
    }, []);

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
                {tags.map((tag) => (
                    <a
                        key={tag.value}
                        className={cx(classes.link, {
                            [classes.linkActive]: tag.value === tagId,
                        })}
                        onClick={(event) => {
                            event.preventDefault();
                            setTagId(tagId === tag.value ? "" : tag.value);
                        }}
                    >
                        <IconTags className={classes.linkIcon} stroke={1.5} />
                        <span>{tag.label}</span>
                    </a>
                ))}
            </Navbar.Section>
        </Navbar>
    ) : undefined;
};
