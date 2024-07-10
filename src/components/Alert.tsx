import React from "react";

import AlertComponent from "./AlertComponent.tsx";

const Alert = ({
  title,
  transactionHash,
  setShowAlert,
  isAction,
  isSuccess,
  showAlert,
}) => {

  const alertProps = [
    {
      message: `${title} Pending...`,
      transactionHash: "",
      variant: "info",
    },
    {
      message: `${title} Successful`,
      transactionHash: transactionHash,
      variant: "success",
    },
    {
      message: `${title} Failed`,
      transactionHash: "",
      variant: "danger",
    },
  ];

  const alerts = alertProps.map((a, idx) => {
    return (
      <AlertComponent
        key={idx}
        message={a.message}
        transactionHash={a.transactionHash}
        variant={a.variant}
        setShowAlert={setShowAlert}
      />
    );
  });

  return (
    <>
      {isAction ? (
        <>{alerts[0]}</>
      ) : isSuccess && showAlert ? (
        <>{alerts[1]}</>
      ) : !isSuccess && showAlert ? (
        <>{alerts[2]}</>
      ) : null}
    </>
  );
};

export default Alert
