import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

type Props = {
  spinner: boolean;
  title: string;
};

export const ButtonComponent = ({ spinner, title }: Props) => {
  return (
    <>
      {spinner ? (
        <Spinner
          animation="border"
          style={{ display: "block", margin: "0 auto", color: "purple" }}
        />
      ) : (
        <Button
          type="submit"
          className="fw-bold"
          style={{
            backgroundColor: "#D8BFD8",
            color: "purple",
            border: "solid purple 2px",
            borderRadius: "5px",
            marginTop: '15px'
          }}
        >
          {title}
        </Button>
      )}
    </>
  );
};

export default ButtonComponent;
