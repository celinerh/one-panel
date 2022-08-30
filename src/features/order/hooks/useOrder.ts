import { useState, useEffect } from "react";
import { useToken } from "../../../contexts/TokenContext";

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

const useOrder = (orderId: number | null) => {
  const [order, setOrder] = useState<Order>();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const { token } = useToken();

  useEffect(() => {
    if (orderId === null) {
      return;
    }

    fetch(`http://localhost:3001/orders/${orderId}`, {
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
        setOrder(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        setIsPending(false);
        setError(error.message);
      });
  }, [orderId]);

  return { order, error, isPending, setOrder };
};

export default useOrder;
