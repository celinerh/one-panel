import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { HiTrash } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "../../../../contexts/TokenContext";
import {
  ProductForm,
  productFormConfig,
} from "../../../../features/product/form";
import ProductFormInputs from "../../../../features/product/ProductFormInputs";

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();
  const form = useForm(productFormConfig);

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
      .then((data) => {
        form.setValues(data);
      });
  }, []);

  const handleSubmit = (values: ProductForm) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
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
      <>
        <h1 className="mb-10 text-2xl font-semibold">
          {form.values.name}{" "}
          <span className="text-base font-normal text-gray-400 align-middle">
            #{id}
          </span>
        </h1>

        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <ProductFormInputs mode="edit" form={form} />
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
    </div>
  );
}

export default Product;
