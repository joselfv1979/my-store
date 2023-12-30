import { Product } from "../../types/Product";
import { useAppSelector } from "../../hooks/redux-hooks";
import AdminButtons from "../adminButtons/AdminButtons";
import { isAdmin } from "../../store/user/userSlice";
import UserButtons from "../userButtons/UserButtons";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  // ProductCard buttons depending on user's role
  const admin = useAppSelector(isAdmin);

  const image = `${process.env.REACT_APP_API_IMAGES}/${product.imagePath}`;

  return (
    <div className="card rounded-1 mx-0">
      <img src={image} className="card-img-top rounded-top-1" alt={product.name} />
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
