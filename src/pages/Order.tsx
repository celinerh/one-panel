import { Button, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "../contexts/TokenContext";

interface OrderProduct {
  id: number;
  quantity: number;
}

interface Order {
  id: number;
  date: Date;
  customerId: number;
  status: string;
  products: OrderProduct[];
}

function Order() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(function () {
    fetch(`http://localhost:3001/orders/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

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
        autoClose: 4000,
      });
    });
  };

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
              customer name <span>#{order.customerId}</span>
            </p>
            <p>customer adress</p>
            <p>customer email</p>
            <p>customer phone</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Select
              label="Status"
              defaultValue={order.status}
              onChange={(e) => {
                setOrder({
                  ...order,
                  status: e ?? "new",
                });
              }}
              data={[
                { value: "new", label: "new" },
                { value: "cancelled", label: "cancelled" },
                { value: "shipped", label: "shipped" },
              ]}
            />

            <div className="flex gap-2">
              <Button className="bg-green-400 hover:bg-green-300" type="submit">
                Update
              </Button>
              <Button
                className="text-red-400 bg-white border-2 border-red-300 hover:bg-red-50"
                type="submit"
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
