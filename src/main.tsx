import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.component";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode="light" />
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ChakraProvider>
  </React.StrictMode>
);
