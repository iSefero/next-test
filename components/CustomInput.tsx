// React
import { FC } from "react";
import { useController } from "react-hook-form";

// Chakra
import { Input } from "@chakra-ui/react";

// Common
import { IInput } from "@/types/types";


export const CustomInput: FC<IInput> = ({ name, title, placeholder, readOnly, required, type, control }) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <>
      <label htmlFor={name}>{title}</label>
      <Input
             placeholder={placeholder}
             isReadOnly={readOnly || false}
             isRequired={required || false}
             type={type || "text"}
             {...field} />
    </>
  );
};
