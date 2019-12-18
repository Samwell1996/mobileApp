import React from 'react';
import { Formik } from 'formik';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import T from 'prop-types';
import {
  email,
  passwordLogin,
  shape,
} from '../../../utils/validationSchema';
import InputAuth from '../../../components/Auth/InputAuth/InputAuth';
import Bottom from '../../../components/Auth/Bottom/Bottom';
import screens from '../../../navigation/screens';
import { s } from '../styles';

function LoginScreen({ navigation }) {
  const validationSchema = shape({
    email,
    passwordLogin,
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => {
        return (
          <KeyboardAvoidingView
            onSubmit={handleSubmit}
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
                keyboardType="email-address"
                error={errors.email}
              />
              <InputAuth
                name="Password"
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('passwordLogin')}
                value={values.passwordLogin}
                error={errors.passwordLogin}
              />
              <Text
                style={s.buttonRestorePassword}
                onPress={() =>
                  navigation.navigate(screens.RestorePassword)
                }
              >
                Forgot password?
              </Text>
            </View>
            <Bottom
              onPressFirst={() =>
                navigation.navigate(screens.Register)
              }
              onPressSecond={() =>
                navigation.navigate(screens.MainApp)
              }
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
  headerStyle: s.header,
});

LoginScreen.propTypes = {
  navigation: T.object,
};

export default LoginScreen;
