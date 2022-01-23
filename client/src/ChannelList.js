import { Button, Text, Flex, Divider } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserCtx";

function ChannelList() {
  const [channels, setChannels] = useState([]);

  const { jwt } = useContext(UserContext);

  useEffect(() => {
    const promise = async () => {
      const response = await axios.get("http://localhost:3000/my/channels", {
        headers: { Authorization: jwt },
      });
      setChannels(response.data);
      console.log(response.data);
    };
    promise();
  }, [jwt]);

  return (
    <Flex
      direction="column"
      bgColor="blue.50"
      pt="8"
      px="4"
      alignItems="flex-start"
      w="100%"
    >
      {channels.map((channel) => 
        <Flex direction="column" key={channel.id} w="100%">
          <Flex>
          <Text pr="2">#</Text>
          <Text>{channel.title}</Text>
          </Flex>
          <Divider my="1" w="100%"/>
        </Flex>
      )}
      <Button colorScheme="blue" leftIcon={<AddIcon />} alignSelf="center">
        New Channel
      </Button>
    </Flex>
  );
}

export default ChannelList;
