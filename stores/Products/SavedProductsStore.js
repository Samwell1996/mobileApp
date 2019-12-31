import { types } from 'mobx-state-tree';
import { asyncModel, safeReference } from '../utils';
import { ProductModel } from './ProductModel';
import Api from '../../Api';

export const SavedProductsStore = types
  .model('SavedProductsStore', {
    items: types.array(safeReference(ProductModel)),
    fetchSaved: asyncModel(fetchSaved),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
    addItem(id) {
      store.setItems([id, ...store.items]);
    },
    removeItem(id) {
      const items = store.items.filter((itemId) => itemId !== id);
      store.setItems(items);
    },
  }));

function fetchSaved() {
  return async function fetchSavedFlow(flow, store) {
    try {
      const res = await Api.Products.fetchSaved();
      store.setItems(res.data.map((item) => item.id));
    } catch (e) {
      console.log(e);
    }
  };
}
