import React from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { s } from './styles';

function Search() {
  return (
    <View style={s.containerHeader}>
      <Ionicons name="md-search" size={25} style={s.icon} />
      <TextInput style={s.input} placeholder="Search" />
    </View>
  );
}
export default Search;
