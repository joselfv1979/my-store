import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { fetchProducts } from "../../store/product/productActions";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { LensIcon } from "../svgs/Icons";
import styles from "../../assets/scss/SearchForm.module.scss";

const SearchForm = () => {

  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleSubmit = (event: SyntheticEvent)=> {
    event.preventDefault()
    dispatch(fetchProducts(query))
  }
  
  return (
    <Form data-testid="form-search" className={styles.searchForm} onSubmit={handleSubmit}>
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
