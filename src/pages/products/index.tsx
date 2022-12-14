import { Button, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../../components/Heading";
import { useToken } from "../../contexts/TokenContext";
import { BsPlusLg } from "react-icons/bs";
import { Product } from "../../features/product/product.model";

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
      <td className="hidden lg:table-cell">{product.brand}</td>
      <td
        className={
          product.stock <= 10
            ? "text-red-500 hidden sm:table-cell"
            : " hidden sm:table-cell"
        }
      >
        {product.stock}
      </td>
      <td className="hidden sm:table-cell">{product.price}</td>
      <td>
        <Button
          component={Link}
          to={`/product/${product.id}`}
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
      <div className="flex gap-6">
        <Heading title="Products" />
        <Button component={Link} to="/product/create" color="primary" size="xs">
          <BsPlusLg />
        </Button>
      </div>
      <Table
        verticalSpacing="xs"
        horizontalSpacing="lg"
        highlightOnHover
        className="bg-white border-2 border-gray-200"
      >
        <thead>
          <tr className="bg-gray-50">
            <th className="whitespace-nowrap">Product ID</th>
            <th>Name</th>
            <th className="hidden lg:table-cell">Brand</th>
            <th className="hidden whitespace-nowrap sm:table-cell">In stock</th>
            <th className="hidden sm:table-cell">Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default Products;
