import { VStack, Heading, Text } from "@chakra-ui/react";

function Channel(){
    

    return(
        <VStack w="full" h="full" p={10} spacing={1} bg="red.50">
            <VStack alignItems="normal">
                <Heading size="lg">Current Channel</Heading>
                
            </VStack>
            <VStack>
                <Text>User1, User2</Text>
            </VStack>
        </VStack> 
    )
}


export default Channel;
