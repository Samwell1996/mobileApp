import { types } from 'mobx-state-tree';
import { ProductsCollection } from './Products/ProductCollection';

export const EntitiesStore = types.model('EntitiesStore', {
  products: ProductsCollection,
});
