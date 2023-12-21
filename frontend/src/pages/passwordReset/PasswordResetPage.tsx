import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import { passwordReset } from 'services/authService';

const PasswordResetPage = () => {

  const [params] = useSearchParams();
  const token = params.get('token');
  
    const [values, setValues] = useState({
        password: "",
        confirmedPassword: ""
    });

    const sendRequest = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(values.password !== values.confirmedPassword) {
          window.alert("password aren't equals");
          return
        }
      const body = { password: values.password }
      
      if (token) await passwordReset(body, token); 
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
          });
    }

  return (
    <Form onSubmit={sendRequest}>
          <h6>Reset your password</h6>
          <Form.Group className="my-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autoFocus
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="formBasicPasswordConfirm">
          <Form.Label>Confirm New password</Form.Label>
            <Form.Control
              type="password"
              name="confirmedPassword"
              autoFocus
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" className="mx-auto my-3 w-75" type="submit">
          Request password reset
        </Button>
        </Form>
  )
}

export default PasswordResetPage