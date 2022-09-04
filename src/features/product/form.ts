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

  validate: {},
};
