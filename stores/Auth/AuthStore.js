import { getRoot, types } from 'mobx-state-tree';
import { asyncModel } from '../utils';
import Api from '../../Api';
import NavigationService from '../../services/NavigationServices';
import { Alert } from 'react-native';

export const AuthStore = types
  .model('AuthStore', {
    login: asyncModel(loginFlow),
    register: asyncModel(registerFlow),
    isLoggedIn: false,
  })

  .actions((store) => ({
    setIsLoggedIn(value) {
      store.isLoggedIn = value;
    },

    logout() {
      store.isLoggedIn = false;
      Api.Auth.logout();
    },
  }));

function loginFlow({ password, email }) {
  return async (flow) => {
    const res = await Api.Auth.login({ password, email });

    Api.Auth.setToken(res.data.token);

    getRoot(flow).viewer.setViewer(res.data.user);
    getRoot(flow).auth.setIsLoggedIn(true);
  };
}

// function loginFlow({ password, email }) {
//   return async (flow) => {
//     try {
//       const res = await Api.Auth.login({ password, email });
//
//       Api.Auth.setToken(res.data.token);
//
//       getRoot(flow).viewer.setViewer(res.data.user);
//       getRoot(flow).auth.setIsLoggedIn(true);
//       NavigationService.navigateToApp();
//     } catch (error) {
//       NavigationService.navigateToAuth();
//       console.log(error);
//       correctAuthAlert();
//     }
//   };
// }

// async function correctAuthAlert() {
//   Alert.alert(
//     'Wrong password or email',
//     'Please, enter correct password and email',
//     [
//       {
//         text: 'OK',
//         style: 'cancel',
//       },
//     ],
//   );
// }

function registerFlow({ password, email, fullName }) {
  return async () => {
    const res = await Api.Auth.register({
      password,
      email,
      fullName,
    });
    console.log(res.data);
  };
}
