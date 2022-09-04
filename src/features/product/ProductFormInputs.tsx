import { NumberInput, Textarea, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ProductForm } from "./form";

function ProductFormInputs({
  mode,
  form,
}: {
  mode: string;
  form: UseFormReturnType<ProductForm>;
}) {
  return (
    <>
      <TextInput
        placeholder="Name"
        label="Name"
        withAsterisk
        className="w-full"
        {...form.getInputProps("name")}
      />
      <TextInput
        placeholder="Brand"
        label="Brand"
        withAsterisk
        className="w-full"
        {...form.getInputProps("brand")}
      />
      <NumberInput
        placeholder="In stock"
        label="In stock"
        withAsterisk
        className="w-full"
        disabled={mode === "edit" ? true : false}
        {...form.getInputProps("stock")}
      />
      <NumberInput
        placeholder="Price"
        label="Price"
        withAsterisk
        className="w-full"
        precision={2}
        hideControls
        {...form.getInputProps("price")}
      />
      <Textarea
        placeholder="Description"
        label="Description"
        withAsterisk
        className="w-full"
        autosize
        minRows={4}
        maxRows={4}
        {...form.getInputProps("description")}
      />
    </>
  );
}

export default ProductFormInputs;
