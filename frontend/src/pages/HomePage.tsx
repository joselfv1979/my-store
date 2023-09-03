import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>My Store</h1>
      <Link to="products">See products</Link>
    </>
  );
};

export default HomePage;
