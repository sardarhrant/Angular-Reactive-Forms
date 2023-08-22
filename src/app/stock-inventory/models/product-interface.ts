export interface Product {
  id: number;
  price: number;
  name: string;
}

export interface CartItem {
  product_id: number;
  quantity: number;
}
