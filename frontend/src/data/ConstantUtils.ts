import toys from '../assets/img/toys.svg'
import drinks from '../assets/img/drinks.svg'
import food from '../assets/img/food.svg'
import cloth from '../assets/img/cloth.svg'
import { Product, ProductCategory } from 'types/Product';
import { User } from 'types/User';

// Product categories 
export const categories: ProductCategory[] = [
  {
    id: 1,
    label: "Choose",
    value: "",
    image: '',
  },
  {
    id: 2,
    label: "Food",
    value: "food",
    image: food,
  },
  {
    id: 3,
    label: "Drink",
    value: "drink",
    image: drinks,
  },
  {
    id: 4,
    label: "Clothes",
    value: "clothes",
    image: cloth,
  },
  {
    id: 5,
    label: "Toys",
    value: "toys",
    image: toys,
  },
];

// Product empty object
export const initialProduct: Product = {
  name: "",
  category: "",
  description: "",
  price: 0,
  imagePath: "",
  rating: 0,
};

// User empty object
export const initialUser: User = {
  username: "",
  fullname: "",
  password: "",
  role: "user",
  email: "",
};
