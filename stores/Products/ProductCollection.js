import { ProductModel } from './ProductModel';
import {
  asyncModel,
  createCollection,
  getTypePhotos,
} from '../utils';
import Api from '../../Api';
import { Product } from '../schema';
import { useStore } from '../createStore';

export const ProductsCollection = createCollection(ProductModel, {
  getProduct: asyncModel(getProduct),
  uploadPhotos: asyncModel(uploadPhotos),
});

  // .actions((store) => ({
  //   setPhotos(photos) {
  //     store.photos = photos;
  //   },
  // }));

export function useProductsCollection() {
  const store = useStore();
  return store.entities.products;
}

async function uploadPhotos(urlPhoto) {
  const type = getTypePhotos(urlPhoto);
  const response = await Api.Products.uploadPhotos(urlPhoto, type);
  setPhotos([...photos, response.data]);
}

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
