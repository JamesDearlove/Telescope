import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { SettingProvider } from "./state/Context";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SettingProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </SettingProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

