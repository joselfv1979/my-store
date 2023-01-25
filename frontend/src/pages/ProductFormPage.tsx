import { useState } from "react";
import { AppWaiting } from "../components/AppStatus";
import ProductForm from "../components/ProductForm";

//{ match, dispatch }
const ProductFormPage = () => {
//  const { id } = match.params;

  const [product, setProduct] = useState({});

  const [editingImage, setEditingImage] = useState(true);

  // useEffect(() => {
  //   if (id) {
  //     setProduct(null);
  //     const getProduct = async (id) => {
  //       try {
  //         const { data } = await axios.get(`/products/${id}`);
  //         setTimeout(() => {
  //           setProduct(data.product);
  //           setEditingImage(false);
  //         }, 1000);
  //       } catch (error) {
  //         dispatch(setError(error.response.data.message));
  //       }
  //     };
  //     getProduct(id);
  //   }
  // }, [dispatch, id]);

  // const addProduct = (data) => {
  //   dispatch(addProductAction(data));
  // };

  // const editProduct = (data, id) => {
  //   dispatch(editProductAction(data, id));
  // };

  // const handleFormSubmit = (data) => {
  //   sendDataProduct(data);
  // };

  // const sendDataProduct = (product) => {
  //   const { name, description, category, price, image } = product;

  //   const data = new FormData();
  //   data.append("name", name);
  //   data.append("description", description);
  //   data.append("category", category);
  //   data.append("price", price);
  //   data.append("image", image);

  //   id ? editProduct(data, id) : addProduct(data);
  // };

  return (
    <>
      {product ? (
        <ProductForm
          // handleFormSubmit={() => console.log('submit')
          // }
          // product={product}
          // setProduct={setProduct}
          // editingImage={editingImage}
          // setEditingImage={setEditingImage}
        />
      ) : (
        <AppWaiting />
      )}
    </>
  );
};

// const mapStateToProps = (state) => ({});

// export default connect(mapStateToProps)(ProductFormPage)
export default ProductFormPage;
