import { useState, useEffect } from "react";
import { useToken } from "../../../contexts/TokenContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  stock: number;
  price: number;
  description: string;
}

const useProducts = (productIds: number[]) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const { token } = useToken();

  const productIdsQuery = productIds.join("&id=");

  useEffect(() => {
    if (productIds.length === 0) {
      return;
    }

    fetch(`http://localhost:3001/products?id=${productIdsQuery}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        setIsPending(false);
        setError(error.message);
      });
  }, [productIdsQuery]);

  return { products, error, isPending };
};

export default useProducts;
