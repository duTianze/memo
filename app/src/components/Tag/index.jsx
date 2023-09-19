import { useState, useEffect, useContext } from "react";
import { Chip } from "@mantine/core";
import useStyles from "./index.styles";
import GlobalContext from "@/components/GlobalContext";

export default function Tag({}) {
    const { classes } = useStyles();
    const {
        tags: [tags, setTags],
        filterTags: [filterTags, setFilterTags],
        tagId: [tagIds, setTagIds],
        channel: [channelId, setChannelId],
    } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`/api/${channelId}/tag?tagIds=${tagIds}`)
            .then((response) => response.json())
            .then((result) => {
                setFilterTags(result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        fetch(`/api/${channelId}/tag`)
            .then((response) => response.json())
            .then((result) => {
                setTags(result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [channelId, tagIds]);

    return (
        <Chip.Group
            className={classes.main}
            multiple
            value={tagIds}
            onChange={setTagIds}
        >
            <div className={classes.content}>
                {filterTags.map((tag) => (
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
