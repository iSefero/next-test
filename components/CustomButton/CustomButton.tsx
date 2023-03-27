// React
import {FC} from "react";

// Next
import Link from "next/link";

// Chakra
import { Button, Text } from "@chakra-ui/react";
import { styles } from "./CustomButtonStyles";

interface IProps {
  text: string;
  href: string
}

export const CustomButton: FC<IProps> = ({text, href}) => {

  return (
    <Link href={href}>
      <Button style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    </Link>
  )
}

