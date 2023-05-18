import { ChangeEvent, useState } from "react";
import styles from "../scss/SearchForm.module.scss";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { fetchProducts } from "../store/product/productActions";
import { useAppDispatch } from "../hooks/redux-hooks";
import { LensIcon } from "./Icons";

const SearchForm = () => {

  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleSubmit = (event: React.SyntheticEvent)=> {
    event.preventDefault()
    dispatch(fetchProducts(query))
  }
  
  return (
    <Form className={styles.searchForm} onSubmit={handleSubmit}>
      <InputGroup>
        <button className={styles.searchButton}>
          <LensIcon />
        </button>

        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
      </InputGroup>
    </Form>
  );
};

export default SearchForm;
