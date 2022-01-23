import { useState, createContext } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export const UserContext = createContext({ jwt: null });

const UserProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const toast = useToast();

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      setUser({
        email,
        username: response.data.username,
        name: response.data.name,
        id: response.data.id,
      });
      setJwt(response.data.token);
      toast({
        title: "Login Successful",
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        position: "top-right",
        description: "Login failed",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const logout = () => {
    setJwt(null);
    setUser(null);
    toast({
      title: "Logged Out Successfully",
      position: "top-right",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <UserContext.Provider value={{ user, jwt, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
