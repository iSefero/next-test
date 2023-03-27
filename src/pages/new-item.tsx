// React
import React, { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form";

// Chakra
import { Box, Flex, Text, Button } from "@chakra-ui/react";

// Next
import Head from "next/head";

// Common
import { CustomInput} from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomAlert } from "../../components/CustomAlert";
import { IItem } from "@/types/types";
import { styles } from "@/styles/NewItemPageStyles";

const NewItem: FC = () => {
  const [resStatus, setResStatus] = React.useState<number>(0);

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      src: "",
      title: "",
      description: "",
      price: null
    }
  });

  const onSubmit: SubmitHandler<IItem> = async (data) => {
   const res = await fetch(`https://630f7dc23792563418911561.mockapi.io/ads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.status) {
      setResStatus(res.status)
      setTimeout(() => setResStatus(0), 4000)
    }
    reset()
  };


  return (
    <>
      <Head>
        <title>Create Ads</title>
      </Head>
      <Flex style={styles.wrapper}>
        <Box style={styles.content}>
          <Text style={styles.text}>Заповніть поля</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              name="src"
              title="Посилання на зображення продукту"
              placeholder="Вставте url посилання на зображення"
              control={control}
            />

            <CustomInput
              name="title"
              title="Назва"
              placeholder="Введіть назву продукту"
              control={control}
            />

            <CustomInput
              name="description"
              title="Опис"
              placeholder="Введіть короткий опис продукту"
              control={control}
              required={true}
            />

            <CustomInput
              name="price"
              title="Ціна"
              type="number"
              placeholder="Введіть ціну продукту"
              control={control}
            />
            <Flex style={styles.button}>
              <Button type="submit">Підтвердити</Button>
            </Flex>
          </form>
        </Box>
        <CustomButton text="Повернутися до оголошень" href="/ads"/>
        {resStatus > 0 && <CustomAlert res={resStatus}/>}
      </Flex>
    </>
  )
}

export default NewItem;