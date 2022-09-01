import {
  Button,
  FileInput,
  NumberInput,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "../contexts/TokenContext";
import { Product } from "../features/product/product.model";

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();

  const [product, setProduct] = useState<Product>();

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

    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
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
        message: "Product was updated successfully",
        autoClose: 3000,
        disallowClose: true,
      });
    });
  };

  const openModal = () =>
    openConfirmModal({
      title: "Are you sure you want to delete this product?",
      labels: { confirm: "Yes", cancel: "No" },
      confirmProps: { color: "secondary" },
      onConfirm: () => {
        fetch(`http://localhost:3001/products/${id}`, {
          method: "DELETE",
          headers: {
            authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        }).then(() => {
          navigate("/products");
          showNotification({
            color: "green",
            title: "Success!",
            message: "Product was deleted successfully",
            autoClose: 3000,
            disallowClose: true,
          });
        });
      },
    });

  return (
    <div>
      {product && (
        <>
          <h1 className="mb-10 text-2xl font-semibold">
            {product.name}{" "}
            <span className="text-base font-normal text-gray-400 align-middle">
              #{product.id}
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
            <div className="flex gap-2">
              <Button color="primary" type="submit">
                Update
              </Button>
              <Button color="secondary" variant="outline" onClick={openModal}>
                <HiTrash />
                <span className="pl-1">Delete</span>
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Product;
