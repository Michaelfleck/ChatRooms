import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatArea from "./ChatArea";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="App">
      
        <BrowserRouter>
         <ChakraProvider>
          <Routes>
            <Route path="/chat" element={<ChatArea/>}></Route>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
          </Routes>
          </ChakraProvider>
        </BrowserRouter>

    </div>
  );
}

export default App;
