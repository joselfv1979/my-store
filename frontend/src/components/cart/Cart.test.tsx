import Cart from "./Cart";
import { type CartItem, type CartState } from "../../types/Cart";
import { render, screen } from "../../tests/utils/test-utils";

const cartList: CartItem[] = [
  {
    id: "1",
    name: "apple",
    category: "food",
    description: "",
    imagePath: "",
    price: 1.35,
    rating: 3,
    quantity: 2,
  },
];

const initialCartState: CartState = {
  items: cartList,
  totalPrice: cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ),
};

describe("Cart", () => {
  it("renders cart component", async () => {
    render(<Cart />, {
      preloadedState: {
        cart: initialCartState,
      },
    });

    const labelItem = screen.getByText(/apple/i);
    expect(labelItem).toBeInTheDocument();
    console.log(labelItem.innerHTML);
  
    const buttons = screen.getAllByRole("button");
    
    expect(buttons).toHaveLength(2);
  });
});
