import { useState, useEffect, useContext } from "react";
import { Chip } from "@mantine/core";
import useStyles from "./index.styles";
import GlobalContext from "@/pages/global-context";

export default function Tag({}) {
    const { classes } = useStyles();
    const {
        tags: [tags, setTags],
        tagId: [tagIds, setTagIds],
        channelId,
    } = useContext(GlobalContext);

    useEffect(() => {
        setTags([]);
        fetch(`http://localhost:8080/api/${channelId}/tag?tagIds=${tagIds}`)
            .then((response) => response.json())
            .then((result) => {
                setTags(result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [tagIds]);

    return (
        <Chip.Group
            className={classes.main}
            multiple
            value={tagIds}
            onChange={setTagIds}
        >
            <div className={classes.content}>
                {tags.map((tag) => (
                    <Chip
                        className={classes.chip}
                        key={tag.value}
                        value={tag.value}
                        size="xs"
                    >
                        {tag.label}
                    </Chip>
                ))}
            </div>
        </Chip.Group>
    );
}
