// React
import React, { FC } from "react";

//Chakra
import { Flex } from "@chakra-ui/react";

// Next
import Head from "next/head";

// Common
import { Ads } from "../../../components/Ads/Ads";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { IItem } from "@/types/types";
import { styles } from "@/styles/adsPageStyles";

export const getServerSideProps:(context) => Promise<{ notFound: boolean } | { props: { item: IItem } }> = async (context) => {
  const { id } = context.params;
  const response = await fetch(`https://630f7dc23792563418911561.mockapi.io/ads/${id}`);
  const data: IItem = await response.json();

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {item: data}
  }
}

const Item: FC = ({ item }: IItem) => {
  return (
  <>
    <Head>
      <title>Ads</title>
    </Head>
    <Flex style={styles.wrapper}>
      <Flex style={styles.contentWrapper}>
        <Ads ads={item}/>
        <CustomButton text="Повернутися до оголошень" href="/ads"/>
      </Flex>
    </Flex>
  </>
)
}

export default Item;