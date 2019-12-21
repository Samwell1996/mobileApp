import { NavigationActions } from 'react-navigation';

class NavigationServices {
  constructor() {
    this._navigation = null;
  }

  init(navigation) {
    if (this._navigation) {
      return;
    }
    this._navigation = navigation;
  }

  navigate(routeName, params) {
    this._navigation.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }

  navigateToHome() {
    this.navigate('Home');
  }
}

export default new NavigationServices();
