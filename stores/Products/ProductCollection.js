import { ProductModel } from './ProductModel';
import { createCollection } from '../utils';
import { useStore } from '../createStore';

export const ProductsCollection = createCollection(ProductModel, {});

export function useProductsCollection() {
  const store = useStore();
  return store.entities.products;
}
