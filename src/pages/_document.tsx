// Chakra
import { ColorModeScript } from "@chakra-ui/react";

// Next
import { Html, Head, Main, NextScript } from "next/document";

// Common
import { theme } from "./_app";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}