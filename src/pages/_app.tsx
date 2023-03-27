// Chakra
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Next
import type { AppProps } from "next/app";

export const theme = extendTheme({
  config: {
    cssVarPrefix: "ck",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}