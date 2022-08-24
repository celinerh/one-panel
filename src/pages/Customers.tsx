import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../contexts/TokenContext";

interface Customer {
  id: number;
  name: string;
  address: string;
  phone: number;
}

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(function () {
    fetch("http://localhost:3001/customers", {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  const rows = customers.map((customer) => (
    <tr key={customer.id}>
      <td>#{customer.id}</td>
      <td>{customer.name}</td>
      <td>{customer.address}</td>
      <td>{customer.phone}</td>
    </tr>
  ));

  return (
    <div>
      <h1>Customers</h1>
      <Table verticalSpacing="xs" horizontalSpacing="xl" highlightOnHover>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default Customers;
