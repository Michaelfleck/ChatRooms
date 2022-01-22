import ChannelList from "./ChannelList";
import Channel from "./Channel";
import People from "./People";
import { SimpleGrid, GridItem, Container, Flex, VStack } from "@chakra-ui/react";

// py = padding-y

function Home() {
  return (
    <Container maxWidth="container.xl" padding={0}>
      <Flex h="100vh" py={12} px={0}>
        <ChannelList/>
        <Channel/>       
        <People/>
      </Flex>
    </Container>
  );
}

export default Home;
