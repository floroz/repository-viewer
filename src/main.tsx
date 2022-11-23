import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.component";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
