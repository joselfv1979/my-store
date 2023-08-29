import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppMessage, AppWaiting } from "./AppStatus";
import { customRender } from "../../utils/test-utils";
import { Status, type Message } from "../../types/Message";
import spinner from "./../puff.svg";

const note: Message = {
  type: Status.SUCCESS,
  text: "operation successful",
};

const cancelMessage = jest.fn();

describe("AppMessage", () => {
  it("renders message component", () => {
    customRender(<AppMessage note={note} />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();

    const labelText = screen.getByText(/operation successful/i);
    expect(labelText).toBeInTheDocument();
  });

  it("close alert component", async () => {
    customRender(<AppMessage note={note} cancelMessage={cancelMessage} />);

    const closeAlert = screen.getByRole('button', { name: 'Close alert' });
    await userEvent.click(closeAlert);
    
    expect(cancelMessage).toHaveBeenCalled();
  });
});

describe("AppWaiting", () => {
  it("renders loading component", () => {
    customRender(<AppWaiting />);

    const image = screen.getByAltText(/Loading.../i);
    expect(image).toHaveAttribute('src', spinner)
  });
});
