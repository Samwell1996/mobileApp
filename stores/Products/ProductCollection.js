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
      // console.log('---------getProductFlow -----1');
      const res = await Api.Products.getById(id);
      // console.log('---------getProductFlow -----2 res', res);

      const resMerge = flow.merge(res.data, Product);
      // console.log('---------getProductFlow -----3 resMerge', resMerge);

    } catch (err) {
      // console.log('---------getProductFlow -----err', err);
      // console.log(err);
    }
  };
}
