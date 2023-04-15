import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const UserButtons = () => {
  return (
    <Button
      variant="success"
      onClick={() => console.log("add")}
      style={{ display: "flex" }}
    >
      <FontAwesomeIcon icon={faCartPlus} size="lg" />
      <span style={{ marginLeft: "1rem" }}>Add to Cart</span>
    </Button>
  );
};

export default UserButtons;
