import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  cart: number;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload.map(product => ({
        ...product,
        cart: 0,
      }));
    },
    incrementCart: (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.cart += 1;
      }
    },
    decrementCart: (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product && product.cart > 0) {
        product.cart -= 1;
      }
    },
  },
});

export const { setProducts, incrementCart, decrementCart } = productsSlice.actions;

export default productsSlice.reducer;
