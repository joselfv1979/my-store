import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { requestPasswordReset } from "services/authService";

type Props = {
  showPasswordResetModal: boolean;
  setShowPasswordResetModal: (show: boolean) => void;
};

// Modal for requesting a password reset
const RequestPasswordResetModal = ({
  showPasswordResetModal,
  setShowPasswordResetModal,
}: Props) => {
  const [value, setValue] = useState({ email: "" });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({ email: event.target.value });
  };

  const sendRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await requestPasswordReset(value);
  };

  const handleClose = () => setShowPasswordResetModal(false);

  return (
    <Modal
      centered
      backdrop="static"
      show={showPasswordResetModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>User password reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={sendRequest}>
          <h6>Request password reset email</h6>
          <Form.Group className="my-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              autoFocus
              required
              placeholder="Your account email"
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="primary" className="mt-3 w-100" type="submit">
            Request password reset
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestPasswordResetModal;
