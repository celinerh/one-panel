interface OrderProduct {
  id: number;
  quantity: number;
}

export interface Order {
  id: number;
  date: Date;
  customerId: number;
  status: string;
  products: OrderProduct[];
}
