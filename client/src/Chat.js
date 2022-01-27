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
  const [currentChannelID, setCurrentChannelID] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="Chat">
      <Grid
        templateRows="4em auto"
        h="100vh"
        overflowY="none"
        pb="8"
        px={{ lg: "36", md: "16", sm: "0" }}
      >
        <Flex justify="end" alignItems="center" h="100%">
          <Text pr="4">{`Hello, ${user?.name}`}</Text>
          <Button
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            colorScheme="blue"
          >
            Log Out
          </Button>
        </Flex>
        <Grid
          shadow="md"
          rounded="lg"
          templateColumns="18em auto"
          h="100%"
          w="w-full"
          overflowY="hidden"
        >
          <ChannelList
            currentChannelID={currentChannelID}
            setCurrentChannelID={setCurrentChannelID}
          />
          <Channel currentChannelID={currentChannelID} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Chat;
