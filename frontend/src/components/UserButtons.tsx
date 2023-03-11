import React from "react";
import styles from "../scss/UserButtons.module.scss";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const UserButtons = () => {
  return (
    <Button variant="success"
    onClick={() => console.log('add')
    }>
      <FontAwesomeIcon icon={faCartPlus} size="lg" />
    </Button>
  );
};

export default UserButtons;
