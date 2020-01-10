import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Ionicons,
  Feather,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import { observer } from 'mobx-react';
import T from 'prop-types';
import { useFormik } from 'formik';
import ActionSheet from 'react-native-actionsheet';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { s } from './styles';
import colors from '../../styles/colors';
import { useStore } from '../../stores/createStore';
import NavigationService from '../../services/NavigationServices';

function CreatePostScreen({ navigation }) {
  const actionRef = useRef();
  const [isSwitch, setIsSwitch] = useState(true);
  const store = useStore();

  async function onSubmit({
    productTitle,
    productDescription,
    productPhotos,
    productPrice,
    productLocation,
  }) {
    await store.ownProducts.createProduct.run({
      productTitle,
      productDescription,
      productPhotos,
      productPrice,
      productLocation,
    });
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      productTitle: '',
      productDescription: '',
      productPhotos: ['Have no Photo'],
      productPrice: '' || '0',
      productLocation: 'Ternopil',
    },
    onSubmit,
    validateOnBlur: true,
  });

  useEffect(() => {
    navigation.setParams({ handleSubmit });
  }, []);

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
        <TextInput
          style={s.inputTitle}
          placeholder="Title"
          onChangeText={handleChange('productTitle')}
          onBlur={handleBlur('productTitle')}
          value={values.productTitle}
          error={touched.productTitle ? errors.productTitle : ''}
        />
        <TextInput
          multiline
          style={s.InputDesc}
          placeholder="Description"
          onChangeText={handleChange('productDescription')}
          onBlur={handleBlur('productDescription')}
          value={values.productDescription}
          error={
            touched.productDescription
              ? errors.productDescription
              : ''
          }
        />
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
      <KeyboardAvoidingView
        keyBoardVerticalOffset={0}
        behavior="padding"
      >
        <Text style={s.text}>price</Text>
        <View style={s.containerPriceButton}>
          <View style={s.containerButton}>
            <TouchableOpacity
              style={[s.priceButton, isSwitch && s.ButtonFocus]}
              onPress={() => setIsSwitch(true)}
            >
              <Text
                style={[s.textPrice, isSwitch && s.textPriceFocus]}
              >
                Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.freeButton, !isSwitch && s.ButtonFocus]}
              onPress={() => setIsSwitch(false)}
            >
              <Text
                style={[s.textPrice, !isSwitch && s.textPriceFocus]}
              >
                Free
              </Text>
            </TouchableOpacity>
          </View>
          {isSwitch && (
            <View>
              <View style={s.line} />
              <TextInput
                keyboardType="number-pad"
                autoCompleteType="cc-number"
                placeholder="Enter price..."
                style={s.inputTitle}
                onChangeText={handleChange('productPrice')}
                onBlur={handleBlur('productPrice')}
                value={values.productPrice}
                error={
                  touched.productPrice ? errors.productPrice : ''
                }
              />
              <TouchableOpacity style={s.textUahContainer}>
                <Text style={s.textPriceLocation}>uah</Text>
              </TouchableOpacity>
            </View>
          )}
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
      </KeyboardAvoidingView>
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

CreatePostScreen.navigationOptions = ({ navigation }) => ({
  title: 'New Post',
  headerLeft: (
    <TouchableOpacity onPress={() => NavigationService.onGoBack()}>
      <Ionicons name="ios-close" size={40} style={s.icon} />
    </TouchableOpacity>
  ),
  headerRight: (
    <TouchableOpacity
      onPress={() => {
        const handleSubmit = navigation.getParam('handleSubmit');
        handleSubmit();
      }}
    >
      <Text style={s.textHeader}>Post</Text>
    </TouchableOpacity>
  ),
  headerStyle: s.header,
});

CreatePostScreen.propTypes = {
  navigation: T.object,
};

export default observer(CreatePostScreen);
