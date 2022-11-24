import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.component";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import "./index.css";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode="light" />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
