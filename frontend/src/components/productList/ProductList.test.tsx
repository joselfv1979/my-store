import { render, screen } from "../../tests/utils/test-utils";
import ProductList from "./ProductList";
import { type Product, type ProductState } from "../../types/Product";

const productList: Product[] = [
  {
    id: "1",
    name: "apple",
    category: "food",
    description: "",
    imagePath: "",
    price: 1.35,
    rating: 3,
  },
];

const initialProductState: ProductState = {
  products: productList,
  product: null,
  loading: false,
};

jest.mock("../../store/product/productActions", () => ({
  fetchProducts: jest.fn(() => Promise.resolve(productList)),
}));

jest.mock("../../services/productService", () => ({
  getProducts: jest.fn(() =>
    Promise.resolve({ success: true, value: productList })
  ),
}));

test("renders product list", async () => {
  render(<ProductList />, {
    preloadedState: {
      product: initialProductState
    }
  });

  const labelElement = screen.getByText(/Product list/i);
  expect(labelElement).toBeInTheDocument();
  expect(screen.getByText('apple')).toBeInTheDocument();
});
