import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Box, Flex, Input, Button, useToast } from "@chakra-ui/react";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    try {
      await axios.post("http://localhost:3000/users", {
        username: user.username,
        email: user.email,
        name: user.name,
        password: user.password,
        password_confirmation: user.confirmPassword,
      });
      toast({
        title: "Account created",
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/");
    } catch (e) {
      console.log(e.response);
      toast({
        title: "Error",
        description: e.response.data.errors.join("\n"),
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [user, toast, navigate]);

  return (
    <Flex direction="column" align="center">
      <Text fontWeight="extrabold" mb="6" fontSize="xx-large" color="gray.800">
        SignUp
      </Text>

      <Box border="1px" p="4" borderColor="gray.500" shadow="md" rounded="md">
        <Flex justify="center">
          <Text w="36" align="left">
            Email:
          </Text>
          <Box width="2" />
          <Input
            value={user.email}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUser({ ...user, email: e.target.value });
            }}
            type="text"
            width="48"
            required
          />
        </Flex>
        <Flex justify="center">
          <Text w="36" align="left">
            Name:
          </Text>
          <Box width="2" />
          <Input
            value={user.name}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUser({ ...user, name: e.target.value });
            }}
            type="text"
            width="48"
            required
          />
        </Flex>
        <Flex justify="center">
          <Text w="36" align="left">
            Username:
          </Text>
          <Box width="2" />
          <Input
            value={user.username}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUser({ ...user, username: e.target.value });
            }}
            type="text"
            width="48"
            required
          />
        </Flex>
        <Flex justify="center">
          <Text w="36" align="left">
            Password:
          </Text>
          <Box width="2" />
          <Input
            value={user.password}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUser({ ...user, password: e.target.value });
            }}
            type="password"
            width="48"
            required
          />
        </Flex>
        <Flex justify="center">
          <Text w="36" align="left">
            Confirm Password:
          </Text>
          <Box width="2" />
          <Input
            value={user.confirmPassword}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUser({ ...user, confirmPassword: e.target.value });
            }}
            type="password"
            width="48"
            required
          />
        </Flex>

        <Button
          mt="6"
          colorScheme="blue"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSubmit();
          }}
        >
          Sign Up!
        </Button>
      </Box>
    </Flex>
  );
};

export default SignUp;
