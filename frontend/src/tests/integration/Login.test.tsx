import { act } from "react-dom/test-utils";
import LoginPage from "../../pages/login/LoginPage";
import { render, screen, waitFor } from "../../tests/utils/test-utils";
import userEvent from "@testing-library/user-event";

test("renders login page", async () => {
  render(<LoginPage />, {});

  const labelElement = screen.getByText(
    /Login here using your username and password/i
  );
  expect(labelElement).toBeInTheDocument();
});

test("login success", async () => {
    render(<LoginPage />, {});

    const userNameField = screen.getByPlaceholderText('Username')
    const passwordField = screen.getByPlaceholderText('Password')

    const user = userEvent.setup();

    user.type(userNameField, 'admin');
    user.type(passwordField, 'renaido');

    act(() => user.click(screen.getByTestId('form-login-button')));

    await waitFor(() =>
         expect(screen.getByTestId('form-search')).toBeEnabled(),
    )
})
