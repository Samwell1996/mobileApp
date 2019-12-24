import React, { useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  Ionicons,
  Feather,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import ActionSheet from 'react-native-actionsheet';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { NavigationService } from '../../services';
import { s } from './styles';
import colors from '../../styles/colors';

function CreatePostScreen() {
  const actionRef = useRef();

  async function onOpenCamera() {
    try {
      await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
      );
      await ImagePicker.launchCameraAsync();
    } catch (err) {
      console.log(err);
    }
  }

  async function onOpenGallery() {
    try {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await ImagePicker.launchImageLibraryAsync();
    } catch (err) {
      console.log(err);
    }
  }

  function onChoose(index) {
    if (index === 0) {
      onOpenCamera();
      return;
    }
    if (index === 1) {
      onOpenGallery();
    }
  }

  function onOpenActionSheet() {
    actionRef.current.show();
  }
  return (
    <ScrollView style={s.container}>
      <View>
        <Text style={s.textInfo}>key information</Text>
        <TextInput style={s.inputTitle} placeholder="Title" />
        <TextInput style={s.InputDesc} placeholder="Description" />
      </View>
      <View>
        <Text style={s.text}>photos</Text>
        <View>
          <View style={s.containerPhotos}>
            <TouchableOpacity
              style={s.photosButton}
              onPress={onOpenActionSheet}
            >
              <Feather name="plus" size={25} style={s.iconPlus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Text style={s.text}>price</Text>
        <View style={s.containerPriceButton}>
          <View style={s.containerButton}>
            <TouchableOpacity style={[s.priceButton]}>
              <Text style={s.textPrice}>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.freeButton]}>
              <Text style={s.textPrice}>Free</Text>
            </TouchableOpacity>
          </View>
          <View style={s.line} />
          <View>
            <TextInput
              keyboardType="number-pad"
              autoCompleteType="cc-number"
              placeholder="Enter price..."
              style={s.inputTitle}
            />
            <TouchableOpacity style={s.textUahContainer}>
              <Text style={s.textPriceLocation}>uah</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={s.text}>location</Text>
        <View style={s.bottomContainer}>
          <TouchableOpacity style={s.touchableButton}>
            <View style={s.locationIconContainer}>
              <MaterialIcons
                name="location-on"
                size={30}
                color={colors.primary}
              />
              <Text style={s.textPriceLocation}>Location</Text>
            </View>
            <Entypo
              name="chevron-right"
              size={35}
              style={s.iconChevron}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ActionSheet
        ref={actionRef}
        title={
          <Text style={s.textModal}>Which one do you like?</Text>
        }
        options={['Camera', 'Gallery', 'Cancel']}
        cancelButtonIndex={2}
        tintColor={colors.primary}
        onPress={onChoose}
      />
    </ScrollView>
  );
}

CreatePostScreen.navigationOptions = () => ({
  title: 'New Post',
  headerLeft: (
    <TouchableOpacity onPress={() => NavigationService.onGoBack()}>
      <Ionicons name="ios-close" size={40} style={s.icon} />
    </TouchableOpacity>
  ),
  headerRight: <Text style={s.textHeader}>Post</Text>,
  headerStyle: s.header,
});

CreatePostScreen.propTypes = {};

export default CreatePostScreen;
