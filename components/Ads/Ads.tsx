// React
import React, {FC} from "react"
import { SubmitHandler, useForm } from "react-hook-form";

// Chakra
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Flex,
  Button,
} from "@chakra-ui/react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Common
import { CustomInput } from "../CustomInput";
import { CustomAlert } from "../CustomAlert";
import { IItem } from "@/types/types";
import { styles } from "./AdsStyles";

interface IProps {
  ads: IItem;
  remove?: (id?: string | number) => Promise<void> | undefined;
}

export const Ads: FC<IProps> = ({ ads, remove}) => {
  const [changeItem, setChangeItem] = React.useState<boolean>(false);
  const [resStatus, setResStatus] = React.useState<number>(0);
  const { pathname } = useRouter();
  const pathState = pathname !== "/ads/[id]";

  const { control, handleSubmit } = useForm({
    defaultValues: {
      src: ads.src,
      title: ads.title,
      description: ads.description,
      price: ads.price
    }
  });

  const onSubmit: SubmitHandler<IProps>= async (data) => {
    const res = await fetch(`https://630f7dc23792563418911561.mockapi.io/ads/${ads.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.status) {
      setResStatus(res.status)
      setTimeout(() => setResStatus(0), 4000)
    }
  };

  const showButton = pathState ?
      <Button style={styles.deleteButton} onClick={() => remove?.(ads.id)} variant='solid' colorScheme='red'>
        <Text style={styles.buttonText}>
          Видалити оголошення
        </Text>
      </Button>
      :
      <Flex style={{flexDirection: "column", gap: "10px"}}>
        <Button style={styles.changeButton} onClick={() =>setChangeItem(!changeItem)} variant='solid' colorScheme='green'>
          <Text style={styles.buttonText}>
            {!changeItem ? "Змінити оголошення" : "Відмінити зміни"}
          </Text>
        </Button>
        {changeItem &&
          <Button style={styles.saveButton} type="submit" variant='solid' colorScheme='blue'>
          <Text style={styles.buttonText}>
            Зберегти зміни
          </Text>
        </Button>
        }
      </Flex>;

  const LinkOrFlex: ({children}: { children: any }) => JSX.Element = ({children}) =>
    pathState ?
      <Link style={styles.linkComponent} href={`ads/${ads.id}`}>{children}</Link> :
      <Flex style={styles.linkComponent}>{children}</Flex>;

  const adsInput =
    <CardBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex style={styles.inputWrapper}>
          <CustomInput
            name="src"
            title="Посилання на картинку продукту"
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
            placeholder="Введіть ціну продукту"
            control={control}
          />
          {changeItem &&
            <>
              <Divider style={styles.divider}/>
              {showButton}
            </>
          }
        </Flex>
      </form>
    </CardBody>;


  const adsContent =
    <CardBody >
      <Flex style={styles.contentWrapper}>
        <Image
          style={styles.contentImg}
          src={ads.src}
          alt='Error while loading image'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>
            {ads.title}
          </Heading>
          <Text>
            {ads.description}
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            {ads.price} ГРН/КГ
          </Text>
        </Stack>
      </Flex>
    </CardBody>;


  return (
      <Card style={styles.cardWrapper}>
        {<LinkOrFlex>{changeItem ? adsInput : adsContent}</LinkOrFlex>}
        {!changeItem &&
          <>
            <Divider style={styles.divider}/>
            {showButton}
          </>}
        {resStatus > 0 && <CustomAlert res={resStatus}/>}
      </Card>
  )
};