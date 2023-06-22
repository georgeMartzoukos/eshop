export interface Product {
    product: string;
    cost: number;
    description: string;
    quantity: number;
    image: string
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

 
  
  export interface Cart {
    cartList: Product[];
  }

  export interface favouriteProducts {
    products: {
      product: string,
      image: string
    }
  }
    