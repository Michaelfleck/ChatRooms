import { useRef, useState, useEffect } from "react";
import { Input, Flex, Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import AuthContext from "./context/AuthProvider";

const Login = () => {
  // const { setAuth } = useContext(AuthContext);
  console.log("hello")
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg();
  }, [user, pwd]);

  // 11:25
  const handleSubmit = async (e) => {
    console.log("here");
    console.log(user, pwd);

    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1> You are logged in!</h1>
          <br />
          <p>
            <Text>Go to Home</Text>
          </p>
        </section>
      ) : (
        <Flex direction="column" align="center">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <Text
            fontSize="xx-large"
            textColor="gray.800"
            fontWeight="extrabold"
            mb="6"
          >
            Sign In
          </Text>

          <Box
            border="1px"
            p="4"
            borderColor="gray.500"
            shadow="md"
            rounded="md"
          >
            <Flex justify="center">
              <Text w="20" align="left">
                Username:
              </Text>
              <Box width="2" />
              <Input
                type="text"
                id="username"
                width="48"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
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
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </Flex>

            <Button
              mt="6"
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit();
              }}
            >
              Sign In
            </Button>
          </Box>
          <Flex flexDir="column">
            <Text textColor="blue.500" pt="12" fontWeight="bold">
              Need an Account?
            </Text>
            <span className="line">
              <Link to="/signup">
                <Text>Sign Up</Text>
              </Link>
            </span>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default Login;

// Original Login info...

// return(
//     <div>
//       <form>
//           <input type="text" placeholder="Email" ></input>
//           <input type="text" placeholder="Password"></input>
//           <button type ="submit">Login</button>
//       </form>
//   </div>
// )
// }
