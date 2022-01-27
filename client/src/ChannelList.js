import {
  Button,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserCtx";

function ChannelList({ currentChannelID, setCurrentChannelID }) {
  const [channels, setChannels] = useState([]);
  const [unsubscribedChannels, setUnsubscribedChannels] = useState([]);
  const [creatingChannel, setCreatingChannel] = useState({});

  const { jwt } = useContext(UserContext);

  const drawerCtl = useDisclosure();
  const modalCtl = useDisclosure();

  const getMyChannels = useCallback(async () => {
    const response = await axios.get("http://localhost:3000/my/channels", {
      headers: { Authorization: jwt },
    });
    const rChannels = response.data;
    setChannels(rChannels);
    if (rChannels[0]) {
      setCurrentChannelID(rChannels[0].id);
    }
  }, [jwt, setCurrentChannelID]);

  const getUnsubscribedChannels = useCallback(async () => {
    const response = await axios.get("http://localhost:3000/channels", {
      headers: { Authorization: jwt },
    });
    const subscribedChannels = new Set(channels.map(({ id }) => id));
    setUnsubscribedChannels(
      response.data.filter(({ id }) => !subscribedChannels.has(id))
    );
  }, [jwt, channels]);

  const joinChannel = useCallback(
    async (channel_id) => {
      await axios.post(
        `http://localhost:3000/user_channels`,
        {
          channel_id,
        },
        {
          headers: { Authorization: jwt },
        }
      );
      await getMyChannels();
      await getUnsubscribedChannels();
      setCurrentChannelID(channel_id);
    },
    [jwt, getMyChannels, getUnsubscribedChannels, setCurrentChannelID]
  );

  useEffect(() => {
    getUnsubscribedChannels();
  }, [getUnsubscribedChannels]);

  const createChannel = useCallback(
    async (title) => {
      const response = await axios.post(
        `http://localhost:3000/channels`,
        {
          title,
        },
        {
          headers: { Authorization: jwt },
        }
      );
      await getMyChannels();
      await getUnsubscribedChannels();
      setCurrentChannelID(response.data.channel.id);
    },
    [jwt, setCurrentChannelID, getMyChannels, getUnsubscribedChannels]
  );

  useEffect(() => {
    getMyChannels();
  }, [getMyChannels]);

  return (
    <>
      <Flex
        direction="column"
        bgColor="gray.50"
        pt="8"
        px="4"
        alignItems="flex-start"
        w="100%"
        borderRight="2px"
        borderColor="gray.300"
        roundedLeft="lg"
      >
        {channels.map((channel) => (
          <Flex direction="column" key={channel.id}>
            <Flex
              color={`${
                currentChannelID === channel.id ? "blue.500" : "blue.800"
              }`}
              my="1"
              fontWeight="bold"
              fontSize="lg"
              role="button"
              onClick={() => setCurrentChannelID(channel.id)}
            >
              <Text pr="2">#</Text>
              <Text>{channel.title}</Text>
            </Flex>
          </Flex>
        ))}
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="blue"
            leftIcon={<AddIcon />}
            alignSelf="center"
            mt="4"
          >
            New Channel
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => modalCtl.onOpen()}>
              Create Channel
            </MenuItem>
            <MenuItem
              onClick={() => {
                drawerCtl.onOpen();
              }}
            >
              Join Channel
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Drawer
        isOpen={drawerCtl.isOpen}
        placement="left"
        onClose={drawerCtl.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Join Channel</DrawerHeader>
          <DrawerBody>
            <Flex flexDir="column" gap="2" alignItems="flex-start">
              {unsubscribedChannels.map((channel) => (
                <Button
                  variant="outline"
                  key={channel.id}
                  onClick={() => {
                    joinChannel(channel.id);
                    drawerCtl.onClose();
                  }}
                >
                  <Flex justifyContent="left">
                    <Text fontSize="lg" fontWeight="bold" pr="2">
                      #
                    </Text>
                    <Text fontSize="lg">{channel.title}</Text>
                  </Flex>
                </Button>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Modal onClose={modalCtl.onClose} isOpen={modalCtl.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Channel Title"
              value={creatingChannel.value}
              onChange={(e) => {
                e.preventDefault();
                setCreatingChannel(e.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                createChannel(creatingChannel);
                setCreatingChannel({});
                modalCtl.onClose();
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChannelList;
