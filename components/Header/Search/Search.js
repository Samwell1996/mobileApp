import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { s } from './styles';

function Search() {
  const [search, setSearch] = useState('');

  return (
    <View style={s.containerHeader}>
      <Ionicons name="md-search" size={25} style={s.icon} />
      <TextInput
        style={s.input}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}
export default Search;
