import React from 'react';
import { Formik } from 'formik';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';
import {
  email,
  password,
  shape,
} from '../../../utils/validationSchema';
import InputAuth from '../../../components/Auth/InputAuth/InputAuth';
import Bottom from '../../../components/Auth/Bottom/Bottom';
import screens from '../../../navigation/screens';
import { useStore } from '../../../stores/createStore';
import { s } from '../styles';
import gStyles from '../../../styles/styles';

function LoginScreen({ navigation }) {
  const validationSchema = shape({
    email,
    password,
  });
  const store = useStore();

  async function onSubmit({ email, password }) {
    await store.auth.login.run({ email, password });
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
      }) => {
        return (
          <KeyboardAvoidingView
            keyBoardVerticalOffset={80}
            behavior="padding"
            style={s.container}
          >
            <View>
              <InputAuth
                name="Email"
                placeholder="example@gmail.com"
                onChangeText={handleChange('email')}
                value={values.email}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                error={touched.email ? errors.email : ''}
                autoCapitalize="none"
              />
              <InputAuth
                name="Password"
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                value={values.password}
                onBlur={handleBlur('password')}
                error={touched.password ? errors.password : ''}
                autoCapitalize="none"
              />
              <View style={s.buttonRestorePasswordView}>
                <Text
                  style={s.buttonRestorePassword}
                  onPress={() =>
                    navigation.navigate(screens.RestorePassword)
                  }
                >
                  Forgot password?
                </Text>
              </View>
            </View>
            <Bottom
              onPressFirst={() =>
                navigation.navigate(screens.Register)
              }
              onPressSecond={handleSubmit}
              textFirst="Don’t have an account?"
              textSecond="register"
              textThird="login"
            />
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
}

LoginScreen.navigationOptions = () => ({
  title: 'Login',
  headerStyle: gStyles.header,
});

LoginScreen.propTypes = {
  navigation: T.object,
};

export default observer(LoginScreen);
