import { types } from 'mobx-state-tree';
import { ProductCollection } from '../schema';
import { asyncModel, getTypePhotos } from '../utils';
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
    uploadPhotos: asyncModel(uploadPhotos),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
    setPhotos(photos) {
      store.photos = photos;
    },
  }));
async function uploadPhotos(urlPhoto) {
  const type = getTypePhotos(urlPhoto);
  const response = await Api.Products.uploadPhotos(urlPhoto, type);
  store.setPhotos([...photos, response.data]);
}

function createProduct({
  productTitle,
  productDescription,
  productPhotos,
  productPrice,
  productLocation,
}) {
  return async function createProductFlow() {
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
function fetchOwnProducts(id) {
  return async function fetchOwnProductsFlow(flow, store) {
    const res = await Api.Products.byUserId(id);
    const result = flow.merge(res.data.list, ProductCollection);
    store.setItems(result);
  };
}
