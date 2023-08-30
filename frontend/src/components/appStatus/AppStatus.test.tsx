import { render, screen } from "../../tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { AppMessage, AppWaiting } from "./AppStatus";
import { Status, type Message } from "../../types/Message";
import spinner from "./../puff.svg";

const note: Message = {
  type: Status.SUCCESS,
  text: "operation successful",
};

const cancelMessage = jest.fn();

describe("AppMessage", () => {
  it("renders message component", () => {
    render(<AppMessage note={note} />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();

    const labelText = screen.getByText(/operation successful/i);
    expect(labelText).toBeInTheDocument();
  });

  it("close alert component", async () => {
    render(<AppMessage note={note} cancelMessage={cancelMessage} />);

    const closeAlert = screen.getByRole('button', { name: 'Close alert' });
    await userEvent.click(closeAlert);
    
    expect(cancelMessage).toHaveBeenCalled();
  });
});

describe("AppWaiting", () => {
  it("renders loading component", () => {
    render(<AppWaiting />);

    const image = screen.getByAltText(/Loading.../i);
    expect(image).toHaveAttribute('src', spinner)
  });
});
