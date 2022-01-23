import {
  Button,
  Text,
  Flex,
  Divider,
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
  DrawerFooter,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserCtx";

function ChannelList( { currentChannelID, setCurrentChannelID }) {
  const [channels, setChannels] = useState([]);

  const [allChannels, setAllChannels] = useState([]);

  const { jwt } = useContext(UserContext);

  const drawer = useDisclosure();

  useEffect(() => {
    const promise = async () => {
      const response = await axios.get("http://localhost:3000/my/channels", {
        headers: { Authorization: jwt },
      });
      setChannels(response.data);
    };
    promise();
  }, [jwt]);

  useEffect(() => {
    const promise = async () => {
      const response = await axios.get("http://localhost:3000/channels", {
        headers: { Authorization: jwt },
      });
      setAllChannels(response.data);
    };
    promise();
  }, [jwt]);

  return (
    <>
      <Flex
        direction="column"
        bgColor="blue.50"
        pt="8"
        px="4"
        alignItems="flex-start"
        w="100%"
      >
        {channels.map((channel) => (
          <Flex direction="column" key={channel.id} w="100%">
            <Flex>
              <Text pr="2">#</Text>
              <Text>{channel.title}</Text>
            </Flex>
            <Divider my="1" w="100%" />
          </Flex>
        ))}
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="blue"
            leftIcon={<AddIcon />}
            alignSelf="center"
          >
            New Channel
          </MenuButton>
          <MenuList>
            <MenuItem>Create Channel</MenuItem>
            <MenuItem onClick={()=> {drawer.onOpen()}}>Join Channel</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Drawer isOpen={drawer.isOpen} placement="left" onClose={drawer.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Join Channel</DrawerHeader>
          <DrawerBody>List Channels</DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue">Join Channel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ChannelList;
