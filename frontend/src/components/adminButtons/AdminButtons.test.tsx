import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminButtons from "./AdminButtons";
import { customRender } from "../../utils/test-utils";

const productId = "1";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("AdminButtons", () => {
  it("renders buttons appropriately", () => {
    customRender(<AdminButtons id={productId} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const editButton = screen.getByTestId("edit-button");
    expect(editButton).toBeInTheDocument();
    const trashButton = screen.getByTestId("trash-button");
    expect(trashButton).toBeInTheDocument();
  });

  it("calls removeProduct function", async () => {
    const spyOne = jest.fn();
    const spyTwo = jest.fn();
    const user = userEvent.setup();

    customRender(<AdminButtons id={productId} />, {
      value: {
        showDeleteModal: false,
        setShowDeleteModal: spyOne,
        id: null,
        setId: spyTwo,
      },
    });

    const trashButton = screen.getByTestId("trash-button");
    await user.click(trashButton);

    expect(spyOne).toHaveBeenCalled();
    expect(spyTwo).toHaveBeenCalledWith(productId);
  });

  it("calls useNavigate hook", async () => {
    const user = userEvent.setup();

    customRender(<AdminButtons id={productId} />);

    const editButton = screen.getByTestId("edit-button");
    await user.click(editButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(
      `/edit-product/${productId}`
    );
  });
});
