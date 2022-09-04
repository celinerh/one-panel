import { Nullable } from "../../utils/types";
import { Product } from "./product.model";

export type ProductForm = Nullable<Omit<Product, "id">>;

export const productFormConfig = {
  initialValues: {
    name: "",
    brand: "",
    stock: null,
    price: null,
    description: "",
  } as ProductForm,

  validate: {
    name: (value: string) =>
      value.length < 2 ? "Product name is too short" : null,
    brand: (value: string) =>
      value.length < 2 ? "Brand name is too short" : null,
    stock: (value: number) =>
      value < 0 ? "Stock value must be zero or a positive number" : null,
    price: (value: number) =>
      value < 0 ? "Price must be zero or a positive number" : null,
    description: (value: string) =>
      value.length < 10
        ? "Description is too short, must be at least 10 characters"
        : null,
  },
};
