import { VStack, Heading, Text } from "@chakra-ui/react";


function ChannelList(){
    

    return(
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-end" bg="blue.50">
            <VStack alignItems="flex-start">
                <Heading size="sm">+ New Channel</Heading>
                <Text>Channel 1</Text>
            </VStack>
        </VStack>  
    )
}


export default ChannelList;