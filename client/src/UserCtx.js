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
      setUser({ email, password });
      setJwt(response.data.token);
      toast({ title: "Login Successful", status: "success" });
    } catch (error) {
      toast({
        title: "Error",
        position: "top-right",
        description: "Login failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, jwt, login }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
