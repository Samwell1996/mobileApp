import { getParent, types } from 'mobx-state-tree';
// import { ProductModel } from './ProductModel';
import { OwnProduct as OwnProductSchema } from '../schema';
import { asyncModel } from '../utils';
import Api from '../../Api';
import { NavigationService } from '../../services';

export const OwnProductsModel = types.model('OwnProductsModel', {
  id: types.identifierNumber,
  ownerId: types.number,
  title: types.string,
  description: types.maybeNull(types.string),
  photos: types.maybeNull(types.array(types.string)),
  location: types.string,
  price: types.number,
  saved: false,
  createdAt: types.string,
  updatedAt: types.string,
});
export const OwnProducts = types
  .model('OwnProductStore', {
    items: types.array(
      types.reference(types.late(() => OwnProductsModel)),
    ),

    fetch: asyncModel(fetchOwnProducts),
    createProduct: asyncModel(createProduct),
    fetchUser: asyncModel(fetchUser),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchUser(id) {
  return async function fetchOwnProductsFlow() {
    await Api.User.getUserId(id);
  };
}

function createProduct({
  productTitle,
  productDescription,
  productPhotos,
  productPrice,
  productLocation,
}) {
  return async function fetchCreateProductFlow() {
    try {
      await Api.Products.addProduct({
        productTitle,
        productDescription,
        productPhotos,
        productPrice,
        productLocation,
      });
      NavigationService.navigateToApp();
    } catch (e) {
      console.log(e);
    }
  };
}
function fetchOwnProducts() {
  return async function fetchOwnProductsFlow(flow, store) {
    const res = await Api.Products.byUserId(getParent(store).id);

    const result = flow.merge(res.data.list, OwnProductSchema);

    store.setItems(result);
  };
}
