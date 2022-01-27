import { useState, useCallback, useContext, useEffect, useRef } from "react";
import {
  Flex,
  Grid,
  Heading,
  IconButton,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import { UserContext } from "./UserCtx";

function Channel({ currentChannelID }) {
  const { jwt, user } = useContext(UserContext);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState("");

  const getMessages = useCallback(
    async (scrollCurrent = false) => {
      if (currentChannelID) {
        console.log("getting messages");
        const response = await axios.get(
          `http://localhost:3000/channels/${currentChannelID}/messages`,
          {
            headers: {
              Authorization: jwt,
            },
          }
        );
        console.log(response.data);
        setChannel(response.data.channel);
        setMessages(response.data.messages);
      }
    },
    [jwt, currentChannelID]
  );

  useEffect(() => {
    const intervalId = setInterval(getMessages, 3000);
    return () => clearInterval(intervalId);
  }, [getMessages]);

  const makeMessage = useCallback(
    async (body) => {
      await axios.post(
        `http://localhost:3000/messages`,
        {
          channel_id: currentChannelID,
          body,
        },
        {
          headers: {
            Authorization: jwt,
          },
        }
      );
      getMessages();
    },
    [jwt, currentChannelID, getMessages]
  );

  useEffect(() => getMessages(), [getMessages]);

  return (
    <Grid
      w="full"
      h="full"
      templateRows="3em auto 5em"
      pt="4"
      pb="2"
      px="2"
      bg="gray.100"
      roundedRight="lg"
      direction="column"
      overflowY="hidden"
    >
      <Heading color="blue.800"># {channel?.title}</Heading>
      <Flex flexDirection="column" w="100%" overflowY="scroll">
        {messages?.map((message) => (
          <Flex
            flexDirection="column"
            alignSelf={`${
              message?.user?.id === user?.id ? "flex-end" : "flex-start"
            }`}
            alignItems="flex-start"
            px="4"
            backgroundColor="white"
            rounded="xl"
            py="2"
            my="2"
          >
            <Text fontWeight="bold">{message.user?.name}</Text>
            <Text>{message.body}</Text>
          </Flex>
        ))}
      </Flex>
      <Flex>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          resize="none"
          bgColor="white"
          width="100%"
          roundedRight="none"
        />
        <IconButton
          colorScheme="blue"
          alignSelf="center"
          h="20"
          w="12"
          roundedLeft="none"
          onClick={() => {
            makeMessage(message);
            setMessage("");
          }}
          icon={<ArrowRightIcon />}
        />
      </Flex>
    </Grid>
  );
}

export default Channel;
