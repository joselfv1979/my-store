import { Product } from "../types/Product";
import { useAppSelector } from "../hooks/redux-hooks";
import AdminButtons from "./adminButtons/AdminButtons";
import { isAdmin } from "../store/user/userSlice";
import UserButtons from "./UserButtons";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const admin = useAppSelector(isAdmin);

  const image = `${process.env.REACT_APP_API_IMAGES}/${product.imagePath}`;

  return (
    <div className="card">
      <img src={image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Price: {product.price} €</p>
        <p className="card-text">{product.description}</p>
        <div className="d-flex justify-content-around">
          {admin ? (
            <AdminButtons id={product.id} />
          ) : (
            <UserButtons product={product} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
