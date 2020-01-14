import { types } from 'mobx-state-tree';
import { ProductCollection } from '../schema';
import { asyncModel } from '../utils';
import Api from '../../Api';
import { NavigationService } from '../../services';
import { ProductModel } from './ProductModel';

export const OwnProducts = types
  .model('OwnProductStore', {
    items: types.array(
      types.reference(types.late(() => ProductModel)),
    ),

    fetchOwnProducts: asyncModel(fetchOwnProducts),
    createProduct: asyncModel(createProduct),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function createProduct({
  productTitle,
  productDescription,
  productPhotos,
  productPrice,
  productLocation,
}) {
  return async function fetchCreateProductFlow() {
    try {
      console.log('123');
      await Api.Products.addProduct({
        productTitle,
        productDescription,
        productPhotos,
        productPrice,
        productLocation,
      });
      console.log('log123');
      NavigationService.navigateToApp();
    } catch (e) {
      console.log(e);
    }
  };
}
function fetchOwnProducts(id) {
  return async function fetchOwnProductsFlow(flow, store) {
    const res = await Api.Products.byUserId(id);
    const result = flow.merge(res.data.list, ProductCollection);
    store.setItems(result);
  };
}
