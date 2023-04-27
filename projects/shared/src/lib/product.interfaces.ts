export interface Product {
    product: string;
    cost: number;
    description: string;
    quantity: number;
}

export interface ProductAPIList {
    status: boolean;
    data: Product[];
}

export interface UsersProducts {
    status: boolean;
    data:  Product[];
}

export interface MyProductAPIList {
    status: boolean;
    data: {
      products: Product[];
    };
  }