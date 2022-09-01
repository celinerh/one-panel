import { NumberInput, Textarea, TextInput } from "@mantine/core";
import { Product } from "./product.model";

function ProductFormInputs({
  product,
  setProduct,
}: {
  product: Product;
  setProduct: Function;
}) {
  return (
    <>
      <TextInput
        name="name"
        placeholder="Name"
        label="Name"
        withAsterisk
        className="w-full"
        value={product.name}
        onChange={(e) => {
          setProduct({
            ...product,
            name: e.target.value,
          });
        }}
      />
      <TextInput
        name="brand"
        placeholder="Brand"
        label="Brand"
        withAsterisk
        className="w-full"
        value={product.brand}
        onChange={(e) => {
          setProduct({
            ...product,
            brand: e.target.value,
          });
        }}
      />
      <TextInput
        name="in-stock"
        placeholder="In stock"
        label="In stock"
        withAsterisk
        className="w-full"
        value={product.stock}
        disabled
      />
      <NumberInput
        name="price"
        placeholder="Price"
        label="Price"
        withAsterisk
        className="w-full"
        precision={2}
        value={product.price}
        onChange={(value) => {
          setProduct({
            ...product,
            price: value ?? 0,
          });
        }}
      />
      <Textarea
        name="description"
        placeholder="Description"
        label="Description"
        withAsterisk
        className="w-full"
        autosize
        minRows={4}
        maxRows={4}
        value={product.description}
        onChange={(e) => {
          setProduct({
            ...product,
            description: e.target.value,
          });
        }}
      />
    </>
  );
}

export default ProductFormInputs;
