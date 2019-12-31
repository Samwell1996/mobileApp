import { getRoot, types } from 'mobx-state-tree';
import { UserModel } from '../UserModel';
import { safeReference } from '../utils';
import Api from '../../Api';

export const ProductModel = types
  .model('ProductModel', {
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
    owner: types.maybe(safeReference(UserModel)),
  })
  .actions((store) => ({
    setSaved(saved) {
      store.saved = saved;
    },
    async addToSaved() {
      const root = getRoot(store);
      try {
        store.setSaved(true);
        root.savedProducts.addItem(store.id);
        await Api.Products.addToSaved(store.id);
      } catch (e) {
        console.log(e);
        store.setSaved(false);
        root.savedProducts.removeItem(store.id);
      }
    },
    async deleteSaved() {
      const root = getRoot(store);
      try {
        store.setSaved(false);
        root.savedProducts.removeItem(store.id);
        await Api.Products.fetchSavedDelete(store.id);
      } catch (e) {
        console.log(e);
        store.setSaved(true);
        root.savedProducts.addItem(store.id);
      }
    },
  }));
