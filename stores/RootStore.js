import { types } from 'mobx-state-tree';
import { AuthStore } from './Auth/AuthStore';
import { ViewerStore } from './ViewerStore';
import { LatestProductsStore } from './Products/LatestProductsStore';
import Api from '../Api';
import { EntitiesStore } from './EntitiesStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),
    latestProducts: types.optional(LatestProductsStore, {}),
    entities: types.optional(EntitiesStore, {}),
  })
  .actions((store) => {
    return {
      async bootstrap() {
        try {
          // eslint-disable-next-line no-undef
          const token = window.localStorage.getItem('___token');

          // TODO: check for undefined token

          if (!token) {
            throw new Error('Unauthorized');
          }

          Api.Auth.setToken(token);
          const res = await Api.Account.getUser();

          store.viewer.setViewer(res.data);
          store.auth.setIsLoggedIn(true);
        } catch (err) {
          console.log(err);
        }
      },
    };
  });
