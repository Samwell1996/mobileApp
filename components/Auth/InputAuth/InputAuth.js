import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import T from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { s } from './styles';

function InputAuth({ error, name, ...props }) {
  const [isFocus, setIsFocus] = useState(false);

  function handleFocus() {
    setIsFocus(true);
  }
  function onBlur() {
    setIsFocus(false);
  }

  return (
    <View>
      {/* eslint-disable-next-line no-nested-ternary */}
      <View style={error ? s.Error : isFocus ? s.focused : s.normal}>
        <View style={s.labelContent}>
          <Text
            style={error ? s.labelError : s.label}
            onFocus={handleFocus}
          >
            {name}
          </Text>
          <View
            style={
              // eslint-disable-next-line no-nested-ternary
              error
                ? s.borderFocus
                : isFocus
                ? s.borderFocus
                : s.borderNormal
            }
          />
        </View>
        <TextInput onBlur={onBlur} onFocus={handleFocus} {...props} />
      </View>
      {!!error && (
        <View>
          <Text style={isFocus ? s.textError : s.textErrorGrey}>
            {error}
          </Text>
          {isFocus ? (
            <MaterialIcons style={s.icon} name="error" size={25} />
          ) : null}
        </View>
      )}
    </View>
  );
}

InputAuth.propTypes = {
  name: T.string,
  error: T.bool,
};

export default InputAuth;
