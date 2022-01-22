import { useRef, useState, useEffect, useContext } from "react";
import { Input, Flex, Box, Text, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserCtx";

const Login = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userCtx.jwt) {
      navigate("/chat");
    }
  }, [userCtx.jwt, navigate]);

  return (
    <Flex direction="column" align="center">
      <Text
        fontSize="xx-large"
        textColor="gray.800"
        fontWeight="extrabold"
        mb="6"
      >
        Sign In
      </Text>

      <Box border="1px" p="4" borderColor="gray.500" shadow="md" rounded="md">
        <Flex justify="center">
          <Text w="20" align="left">
            Email:
          </Text>
          <Box width="2" />
          <Input
            type="text"
            width="48"
            value={userLogin.email}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUserLogin({ ...userLogin, email: e.target.value });
            }}
            required
          />
        </Flex>
        <Flex justify="center">
          <Text w="20" align="left">
            Password:
          </Text>
          <Box width="2" />
          <Input
            type="password"
            width="48"
            value={userLogin.password}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUserLogin({ ...userLogin, password: e.target.value });
            }}
            required
          />
        </Flex>

        <Button
          mt="6"
          colorScheme="blue"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            userCtx.login(userLogin);
          }}
        >
          Sign In
        </Button>
      </Box>
      <Flex flexDir="column">
        <Text pt="12" fontWeight="bold">
          Need an Account?
        </Text>
        <span className="line">
          <Link to="/signup">
            <Text textColor="blue.500" fontWeight="bold">
              Sign Up
            </Text>
          </Link>
        </span>
      </Flex>
    </Flex>
  );
};
export default Login;
