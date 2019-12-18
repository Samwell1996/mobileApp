import { ProductModel } from './ProductModel';
import { asyncModel, createCollection } from '../utils';
import Api from '../../Api';

export const ProductsCollection = createCollection(ProductModel, {
  getProduct: asyncModel(getProduct),
});

function getProduct(id) {
  return async function getProductFlow(flow, store) {
    const res = await Api();

    store.add(res.data.id, res.data);
  };
}
