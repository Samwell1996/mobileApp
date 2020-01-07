import { getParent, types } from 'mobx-state-tree';
// import { ProductModel } from './ProductModel';
import { OwnProduct as OwnProductSchema } from '../schema';
import { asyncModel } from '../utils';
import Api from '../../Api';

export const OwnProducts = types
  .model('OwnProductStore', {
    items: types.array(
      types.reference(types.late(() => ProductModel)),
    ),

    fetch: asyncModel(fetchOwnProducts),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchOwnProducts() {
  return async function fetchOwnProductsFlow(flow, store) {
    const res = await Api.Products.byUserId(getParent(store).id);

    const result = flow.merge(res.data.list, OwnProductSchema);

    store.setItems(result);
  };
}
