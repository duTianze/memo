import {
    Header,
    Autocomplete,
    Group,
    Container,
    useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconBallpen } from "@tabler/icons-react";
import useStyles from "./Header.styles";

export default ({ opened, setOpened }) => {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    return (
        <Header className={classes.main}>
            <Container className={classes.header} fluid>
                <Group>
                    <IconBallpen size={28} />
                </Group>

                <Group>
                    <Autocomplete
                        placeholder="Search"
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                        data={["React", "Angular", "Vue"]}
                    />
                </Group>
            </Container>
        </Header>
    );
};
