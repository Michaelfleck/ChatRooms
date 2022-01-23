import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Chat";
import Login from "./Login";
import SignUp from "./SignUp";
import UserProvider from "./UserCtx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ChakraProvider>
          <UserProvider>
            <Routes>
              <Route path="/chat" element={<Chat />}></Route>
              <Route path="/" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
          </UserProvider>
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
