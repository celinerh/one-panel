import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../../../contexts/TokenContext";
import { Product } from "../../../../features/product/product.model";
import ProductFormInputs from "../../../../features/product/ProductFormInputs";

function CreateProduct() {
  const navigate = useNavigate();
  const { token } = useToken();

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    brand: "",
    stock: 0,
    price: 0,
    description: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3001/products`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    }).then(() => {
      navigate("/products");
      showNotification({
        color: "green",
        title: "Success!",
        message: "Product was created successfully",
        autoClose: 3000,
        disallowClose: true,
      });
    });
  };

  return (
    <div>
      {product && (
        <>
          <h1 className="mb-10 text-2xl font-semibold">Add product</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <ProductFormInputs
              mode="create"
              product={product}
              setProduct={setProduct}
            />
            <Button color="primary" type="submit" className="w-[100px]">
              Create
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

export default CreateProduct;
