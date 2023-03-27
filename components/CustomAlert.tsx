// React
import React, { FC } from "react";

// Chakra
import { AlertIcon, Alert } from "@chakra-ui/react";

interface IProps {
  res: number
}

export const CustomAlert: FC<IProps> = ({res}) => {
  const [showPositiveAlert, setShowPositiveAlert] = React.useState<boolean>(false);
  const [showNegativeAlert, setShowNegativeAlert] = React.useState<boolean>(false);
  const [statusColor, setStatusColor] = React.useState<boolean>(false);

  // Checking the response and displaying a warning message regarding the response
  React.useEffect(() => {
    if (res >= 200 && res <= 299) {
      setShowPositiveAlert(true);
      setStatusColor(true);
      setTimeout(() => {setShowPositiveAlert(false)}, 4000);
    } else {
      setShowNegativeAlert(true);
      setStatusColor(false);
      setTimeout(() => {setShowNegativeAlert(false)}, 4000);
    }

  }, [res]);



  return (
    <Alert
      style={{opacity: showPositiveAlert || showNegativeAlert ? "1" : "0", transition: "opacity 0.5s ease-in-out"}}
      status={statusColor ? 'success' : "error"}>
      <AlertIcon />
      {showPositiveAlert && "Дані завантажено на сервер!" || showNegativeAlert && "Виникла помилка при обробці вашого запиту"}
    </Alert>
  )
}