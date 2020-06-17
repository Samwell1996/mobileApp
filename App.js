import React, { useEffect } from 'react';
import { View, YellowBox } from 'react-native';
import { SplashScreen } from 'expo';
import Navigator from './navigation/Index';
import globalStyles from './styles/styles';
import { createStore, Provider } from './stores/createStore';

const store = createStore();

SplashScreen.preventAutoHide();

export default function App() {
  useEffect(() => {
    async function bootstrap() {
      await store.bootstrap();

      YellowBox.ignoreWarnings(['Require cycle:']);
      SplashScreen.hide();
    }
    bootstrap();
  }, []);

  return (
    <Provider value={store}>
      <View style={[globalStyles.fillAll]}>
        <Navigator />
      </View>
    </Provider>
  );
}
