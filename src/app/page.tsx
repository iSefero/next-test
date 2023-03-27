"use client";
// Chakra
import { Flex } from "@chakra-ui/react";

// Common
import { CustomButton } from "../../components/CustomButton/CustomButton";

// Next
import Head from "next/head";

export default function Home(): JSX.Element {

  return (
    <>
      <Head>
        <title>Main page</title>
      </Head>
      <Flex style={{justifyContent: "center", alignItems: "center", width: "100%", height: "100vh"}}>
        <CustomButton text="Перейти до оголошень" href="/ads"/>
      </Flex>
    </>
  );
}