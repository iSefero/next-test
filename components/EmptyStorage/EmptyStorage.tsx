// React
import { FC } from "react";

// Chakra
import { Flex, Image, Text} from "@chakra-ui/react";

// Common
import { CustomButton } from "../CustomButton/CustomButton";
import { styles } from "./EmptyStorageStyles";

export const EmptyStorage: FC = () => {
  return (
    <Flex style={styles.wrapper}>
      <Image style={styles.image} src="download.png" alt="error"/>
      <Flex style={styles.textWrapper}>
        <Text style={styles.text}>У вас немає товарів для продажу,</Text>
        <Text style={styles.text}>щоб додати товар, натисніть на кнопку знизу.</Text>
      </Flex>
      <CustomButton text="Додати товар" href="/new-item"/>
    </Flex>
  )
};