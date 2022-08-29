import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import { useToken } from "../contexts/TokenContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  stock: number;
  price: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(function () {
    fetch("http://localhost:3001/products", {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const rows = products.map((product) => (
    <tr key={product.id}>
      <td>#{product.id}</td>
      <td>{product.name}</td>
      <td>{product.brand}</td>
      <td className={product.stock <= 10 ? "text-red-500" : ""}>
        {product.stock}
      </td>
      <td>{product.price}</td>
      <td>
        <Link to={`/product/${product.id}`}>Edit</Link>
      </td>
    </tr>
  ));

  return (
    <div>
      <Heading title="Products" />
      <Table
        verticalSpacing="xs"
        horizontalSpacing="xl"
        highlightOnHover
        className="bg-white border-2 border-gray-200"
      >
        <thead>
          <tr className="bg-gray-50">
            <th>Product ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>In stock</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default Products;
