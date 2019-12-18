import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import T from 'prop-types';
import { Formik } from 'formik';
import { email, shape } from '../../../utils/validationSchema';
import Bottom from '../../../components/Auth/Bottom/Bottom';
import InputAuth from '../../../components/Auth/InputAuth/InputAuth';
import screens from '../../../navigation/screens';
import { s } from '../styles';

function RestorePasswordScreen({ navigation }) {
  const validationSchema = shape({
    email,
  });
  return (
    <Formik
      initialValues={{
        email: '',
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
            </View>
            <Bottom
              onPressFirst={() =>
                navigation.navigate(screens.Register)
              }
              onPressSecond={() => navigation.navigate(screens.Login)}
              textFirst="Don’t have an account?"
              textSecond="register"
              textThird="Send"
            />
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
}

RestorePasswordScreen.navigationOptions = () => ({
  title: 'Restore Password',
  headerStyle: s.header,
});

RestorePasswordScreen.propTypes = {
  navigation: T.object,
};

export default RestorePasswordScreen;
