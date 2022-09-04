import { Badge, Button, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../../components/Heading";
import { useToken } from "../../contexts/TokenContext";

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
          variant="outline"
          size="sm"
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
      <td className="hidden sm:table-cell whitespace-nowrap">
        {order.date.toString()}
      </td>
      <td className="hidden lg:table-cell">#{order.customerId}</td>
      <td className="hidden md:table-cell">
        {order.products.reduce((acc, curr) => {
          return (acc += curr.quantity);
        }, 0)}
      </td>

      <td>
        <Button
          component={Link}
          to={`/order/${order.id}`}
          color="tertiary"
          size="xs"
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
        horizontalSpacing="lg"
        className="bg-white border-2 border-gray-200"
      >
        <thead>
          <tr className="bg-gray-50">
            <th className="md:w-32 lg:w-40">Status</th>
            <th className="whitespace-nowrap">Order ID</th>
            <th className="hidden sm:table-cell">Date</th>
            <th className="hidden whitespace-nowrap lg:table-cell">
              Customer ID
            </th>
            <th className="hidden md:table-cell">Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default Orders;
