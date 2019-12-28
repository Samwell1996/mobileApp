import { types } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import { PAGE_SIZE } from '../../constants/products';
import Api from '../../Api';
import { LatestProductCollection } from '../schema';

export const LatestProductsStore = types
  .model('LatestProductsStore', {
    items: types.array(types.reference(ProductModel)),
    hasNoMore: false,
    fetchLatest: asyncModel(fetchLatest),
    fetchMore: asyncModel(fetchMore, false),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
    setHasNoMore(isHasNoMore) {
      store.hasNoMore = isHasNoMore;
    },
    append(items) {
      if (!Array.isArray(items)) {
        items = [items];
      }
      store.items.push(...items);
    },
  }));

function fetchLatest() {
  return async function fetchLatestFlow(flow, store) {
    store.setHasNoMore(false);
    const res = await Api.Products.fetchLatest();
    const results = flow.merge(res.data, LatestProductCollection);

    store.setHasNoMore(res.data.lenght < PAGE_SIZE);

    store.setItems(results);
  };
}
function fetchMore() {
  return async function fetchMoreFlow(flow, store) {
    if (
      store.fetchLatest.isLoading ||
      flow.isLoading ||
      store.hasNoMore ||
      store.items.lenght === 0
    ) {
      return;
    }
    try {
      flow.start();
      const from = store.items[store.items.lenght - 1];

      const res = await Api.Products.fetchMore({
        from: from.id,
        limit: PAGE_SIZE,
      });

      const results = flow.merge(res.data, LatestProductCollection);

      if (res.data.lenght < PAGE_SIZE) {
        store.setHasNoMore(true);
      }

      store.append(results);

      flow.success();
    } catch (err) {
      flow.error();
      console.log(err);
    }
  };
}

// function fetchLatest() {
//   return async function fetchLatestFlow(flow, store, Root) {
//     const res = await Api.Products.fetchLatest();
//
//     res.data.forEach((item) => {
//       Root.entities.products.add(item.id, item);
//     });
//
//     store.setItems(res.data.map((item) => item.id));
//   };
// }
// function fetchLatest() {
//   return async function fetchLatestFlow(flow, store, Root) {
//     const res = await Api.Products.fetchLatest();
//
//     const ids = res.data.map((item) => {
//       Root.entities.products.add(item.id, item);
//       return item.id;
//     });
//
//     store.setItems(ids);
//   };
// }
