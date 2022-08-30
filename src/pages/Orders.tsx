import { Badge, Button, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
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

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(function () {
    fetch("http://localhost:3001/orders", {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const rows = orders.map((order) => (
    <tr key={order.id}>
      <td>
        <Badge
          color={
            order.status === "shipped"
              ? "green"
              : order.status === "cancelled"
              ? "red"
              : "blue"
          }
        >
          {order.status}
        </Badge>
      </td>
      <td>#{order.id}</td>
      <td>{order.date.toString()}</td>
      <td>#{order.customerId}</td>
      <td>
        {order.products.reduce((acc, curr) => {
          return (acc += curr.quantity);
        }, 0)}
      </td>

      <td>
        <Button
          component={Link}
          to={`/order/${order.id}`}
          className="bg-gray-400 hover:bg-gray-300"
        >
          Edit
        </Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <Heading title="Orders" />
      <Table
        verticalSpacing="xs"
        horizontalSpacing="xl"
        className="bg-white border-2 border-gray-200"
      >
        <thead>
          <tr className="bg-gray-50">
            <th className="w-48">Status</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default Orders;
