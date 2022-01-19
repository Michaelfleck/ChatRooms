import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import ChatArea from "./ChatArea";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <ChatArea />
        <Login />
      </ChakraProvider>
    </div>
  );
}

export default App;
