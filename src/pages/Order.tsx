import { Button, Select, Table, Text } from "@mantine/core";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "../contexts/TokenContext";
import useCustomer from "../features/order/hooks/useCustomer";
import useOrder from "../features/order/hooks/useOrder";
import useProducts from "../features/order/hooks/useProducts";

function Order() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const {
    order,
    setOrder,
    error: orderError,
    isPending: isOrderPending,
  } = useOrder(id ? Number(id) : null);

  const {
    customer,
    error: customerError,
    isPending: isCustomerPending,
  } = useCustomer(order?.customerId ?? null);

  const {
    products,
    error: productsError,
    isPending: isProductsPending,
  } = useProducts(order?.products.map((product) => product.id) ?? []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3001/orders/${id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    }).then(() => {
      navigate("/orders");
      showNotification({
        color: "green",
        title: "Success!",
        message: "Order was updated successfully",
        autoClose: 3000,
        disallowClose: true,
      });
    });
  };

  const openModal = () =>
    openConfirmModal({
      title: "Are you sure you want to discard the changes?",
      children: <Text size="sm">You will lose all the changes you made</Text>,
      labels: { confirm: "Yes", cancel: "No" },
      onConfirm: () => navigate("/orders"),
    });

  const rows = products.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        {
          order?.products.find((orderProduct) => orderProduct.id === product.id)
            ?.quantity
        }
      </td>
      <td>product total</td>
    </tr>
  ));

  return (
    <div>
      {order && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              Order <span>#{order.id}</span>
            </h1>
            <p className="text-gray-500">{order.date.toString()}</p>
          </div>

          <div className="my-4 text-sm">
            <p>
              {customer?.name} <span>#{order.customerId}</span>
            </p>
            <p>{customer?.address}</p>
            <p>{customer?.email}</p>
            <p>{customer?.phone}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Select
              label="Status"
              defaultValue={order.status}
              onChange={(status) => {
                setOrder({
                  ...order,
                  status: status ?? "new",
                });
              }}
              data={[
                { value: "new", label: "new" },
                { value: "cancelled", label: "cancelled" },
                { value: "shipped", label: "shipped" },
              ]}
            />
            <Table className="bg-white border-2 border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th>Products</th>
                  <th>Cost</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">{rows}</tbody>
              <tfoot>
                <tr className="bg-gray-300">
                  <th>Total</th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                </tr>
              </tfoot>
            </Table>

            <div className="flex gap-2">
              <Button className="bg-green-400 hover:bg-green-300" type="submit">
                Update
              </Button>
              <Button
                className="text-red-400 bg-white border-2 border-red-300 hover:bg-red-50"
                onClick={openModal}
              >
                Cancel
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Order;
