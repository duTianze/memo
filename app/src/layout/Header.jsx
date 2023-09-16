import { Header, Autocomplete, Group, Container, Burger } from "@mantine/core";
import { IconSearch, IconBallpen } from "@tabler/icons-react";
import useStyles from "./Header.styles";

export default ({ setChannelOpened }) => {
    const { classes, theme } = useStyles();

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
