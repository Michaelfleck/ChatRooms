import ChannelList from "./ChannelList";
import Channel from "./Channel";
import People from "./People";
import { GridItem, Grid, Flex, Text, Button } from "@chakra-ui/react";
import { UserContext } from "./UserCtx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  const { user, logout } = useContext(UserContext);

  const [ currentChannelID, setCurrentChannelID ] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="Chat">
      <Grid
        templateColumns="18em auto"
        templateRows="4em auto"
        pb="8"
        h="100vh"
        w="w-full"
        px={{ lg: "36", md: "16", sm: "0" }}
      >
        <GridItem colSpan={2}>
          <Flex justify="end" alignItems="center" h="100%">
            <Text pr="4">{`Hello, ${user?.name}`}</Text>
            <Button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Log Out
            </Button>
          </Flex>
        </GridItem>
        <ChannelList currentChannelID={currentChannelID} setCurrentChannelID={setCurrentChannelID}/>
        <Channel />
      </Grid>
    </div>
  );
}

export default Chat;
