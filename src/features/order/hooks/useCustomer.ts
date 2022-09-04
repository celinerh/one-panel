import { useState, useEffect } from "react";
import { useToken } from "../../../contexts/TokenContext";
import { Customer } from "../../customer/customer.model";

const useCustomer = (customerId: number | null) => {
  const [customer, setCustomer] = useState<Customer>();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const { token } = useToken();

  useEffect(() => {
    if (customerId === null) {
      return;
    }

    fetch(`http://localhost:3001/customers/${customerId}`, {
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
        setCustomer(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        setIsPending(false);
        setError(error.message);
      });
  }, [customerId]);

  return { customer, error, isPending };
};

export default useCustomer;
