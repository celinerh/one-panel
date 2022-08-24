import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../contexts/TokenContext";

interface OrderProduct {
  id: number;
  quantity: number;
}

interface Order {
  id: number;
  customerId: number;
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
      <td>#{order.id}</td>
      <td>{order.customerId}</td>
      <td>
        {order.products.reduce((acc, curr) => {
          return (acc += curr.quantity);
        }, 0)}
      </td>
    </tr>
  ));

  return (
    <div>
      <h1>Orders</h1>
      <Table verticalSpacing="xs" horizontalSpacing="xl" highlightOnHover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default Orders;
