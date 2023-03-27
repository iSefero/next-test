// React
import React, { FC } from "react"

// Chakra
import { Flex } from "@chakra-ui/react";

// Next
import Head from "next/head";

// Common
import { Ads } from "../../../components/Ads/Ads";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { EmptyStorage } from "../../../components/EmptyStorage/EmptyStorage";
import { IItem } from "@/types/types";
import { styles } from "@/styles/StorageStyles";


export async function fetchData() {
  const res = await fetch("https://630f7dc23792563418911561.mockapi.io/ads");
  const data = await res.json();
  return data;
}

export async function getServerSideProps() {
  try {
    const data = await fetchData();
    return { props: { ads: data } }
  } catch {
    return {
      props: {ads: null}
    }
  }
}

const AdsPage: FC = ({ ads }: IItem[]) => {
  const [items, setItems] = React.useState<IItem[]>(ads);

  const removeAds = async (id: number) => {
    const res = await fetch(`https://630f7dc23792563418911561.mockapi.io/ads/${id}`, {
      method: "DELETE"
    });
    if (res.status === 200) {
      const data = await fetchData();
      setItems(data);
    }
  };

  const justifyContent = items.length ? "flex-start" : "center";

  return (
    <>
      <Head>
        <title>Storage</title>
      </Head>
      <Flex style={{ ...styles.wrapper, justifyContent } as React.CSSProperties}>
        {items.length ?
          <>
            <Flex style={styles.contentWrapper}>
              {items && items.map((item) => (
                <div style={styles.item} key={item.id}>
                  <Ads remove={removeAds} key={item.id} ads={item}/>
                </div>
              ))}
            </Flex>
            <Flex style={styles.button}>
              <CustomButton text="Створити нове оголошення" href="/new-item"/>
            </Flex>
          </> :
          <EmptyStorage/>
        }
      </Flex>
    </>
  )
}

export default AdsPage;
