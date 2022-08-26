import {
  Button,
  FileInput,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "../contexts/TokenContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  stock: number;
  price: number;
  description: string;
}

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();

  const [product, setProduct] = useState<Product>();
  const [image, setImage] = useState<File[] | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(function () {
    fetch(`http://localhost:3001/products/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  console.log(image);

  return (
    <div>
      {product && (
        <>
          <h1>
            {product.name} <span>#{product.id}</span>
          </h1>

          <form onSubmit={handleSubmit}>
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
            <FileInput
              placeholder="Drag and drop image to upload or import image from your computer"
              accept="image/png,image/jpeg"
              onChange={(file) => {
                setImage(file);
              }}
              multiple
            />
            <Button className="bg-green-400 hover:bg-green-300" type="submit">
              Update
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

export default Product;
