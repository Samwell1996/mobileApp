import { ProductModel } from './ProductModel';
import { asyncModel, createCollection } from '../utils';
import Api from '../../Api';
import { Product } from '../schema';

export const ProductsCollection = createCollection(ProductModel, {
  getProduct: asyncModel(getProduct),
});

function getProduct(id) {
  return async function getProductFlow(flow) {
    try {
      const res = await Api.Products.getById(id);

      flow.merge(res.data, Product);
    } catch (err) {
      console.log(err);
    }
  };
}
