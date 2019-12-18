import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Formik } from 'formik';
import T from 'prop-types';
import screens from '../../../navigation/screens';
import {
  email,
  password,
  shape,
} from '../../../utils/validationSchema';
import InputAuth from '../../../components/Auth/InputAuth/InputAuth';
import Bottom from '../../../components/Auth/Bottom/Bottom';
import { s } from '../styles';

function RegisterScreen({ navigation }) {
  const validationSchema = shape({
    email,
    password,
    passwordAgain: password,
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordAgain: '',
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
                onChangeText={handleChange('password')}
                value={values.password}
                error={errors.password}
              />
              <InputAuth
                name="Repeat Password"
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('passwordAgain')}
                value={values.passwordAgain}
                error={errors.passwordAgain}
              />
            </View>
            <Bottom
              onPressFirst={() => navigation.navigate(screens.Login)}
              onPressSecond={() =>
                navigation.navigate(screens.MainApp)
              }
              textFirst="Have an account??"
              textSecond="login"
              textThird="register"
            />
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
}

RegisterScreen.navigationOptions = () => ({
  title: 'Register',
  headerStyle: s.header,
});

RegisterScreen.propTypes = {
  navigation: T.object,
};

export default RegisterScreen;
