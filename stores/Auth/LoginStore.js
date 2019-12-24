import { flow, types } from 'mobx-state-tree';
import Api from '../../Api';

// const testModel = asyncModel(loginFlow);
//
// testModel.run({ password: '1', email: '1' });

export const LoginStore = types
  .model('LoginStore', {
    isLoading: false,
    isError: false,
  })
  .actions((store) => ({
    run: flow(function* run({ password, email }) {
      try {
        store.isLoading = true;
        store.isError = false;

        const res = yield Api.Auth.login({ password, email });

        store.isLoading = false;
      } catch (err) {
        store.isError = true;
      }
    }),
  }));
