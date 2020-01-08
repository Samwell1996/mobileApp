import React, { useRef, useState } from 'react';
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
import { Formik } from 'formik';
import ActionSheet from 'react-native-actionsheet';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { NavigationService } from '../../services';
import { s } from './styles';
import colors from '../../styles/colors';

function CreatePostScreen() {
  const actionRef = useRef();
  const [isSwitch, setIsSwitch] = useState(true);

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
    <Formik
      initialValues={{
        title: '',
        description: '',
        photo: '',
        price: '',
        location: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
      }}
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
          <ScrollView style={s.container}>
            <View>
              <Text style={s.textInfo}>key information</Text>
              <TextInput
                style={s.inputTitle}
                placeholder="Title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                error={touched.title ? errors.title : ''}
              />
              <TextInput
                style={s.InputDesc}
                placeholder="Description"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                error={touched.description ? errors.description : ''}
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
                    <Feather
                      name="plus"
                      size={25}
                      style={s.iconPlus}
                    />
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
                      style={[
                        s.textPrice,
                        isSwitch && s.textPriceFocus,
                      ]}
                    >
                      Price
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[s.freeButton, !isSwitch && s.ButtonFocus]}
                    onPress={() => setIsSwitch(false)}
                  >
                    <Text
                      style={[
                        s.textPrice,
                        !isSwitch && s.textPriceFocus,
                      ]}
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
                      onChangeText={handleChange('price')}
                      onBlur={handleBlur('price')}
                      value={values.price}
                      error={touched.price ? errors.price : ''}
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
                <Text style={s.textModal}>
                  Which one do you like?
                </Text>
              }
              options={['Camera', 'Gallery', 'Cancel']}
              cancelButtonIndex={2}
              tintColor={colors.primary}
              onPress={onChoose}
            />
          </ScrollView>
        );
      }}
    </Formik>
  );
}

CreatePostScreen.navigationOptions = () => ({
  title: 'New Post',
  headerLeft: (
    <TouchableOpacity onPress={() => NavigationService.onGoBack()}>
      <Ionicons name="ios-close" size={40} style={s.icon} />
    </TouchableOpacity>
  ),
  headerRight: (
    <TouchableOpacity onPress={() => handleSubmit}>
      <Text style={s.textHeader}>Post</Text>
    </TouchableOpacity>
  ),
  headerStyle: s.header,
});

CreatePostScreen.propTypes = {};

export default observer(CreatePostScreen);
