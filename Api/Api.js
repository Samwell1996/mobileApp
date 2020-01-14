import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { NavigationService } from '../services';

const BASE_URL = 'https://apiko-intensive-backend.herokuapp.com/';

export const Auth = {
  _token: null,

  async setToken(token) {
    this._token = token;
    // eslint-disable-next-line no-undef
    await AsyncStorage.setItem('___token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  async logout() {
    this._token = null;
    // eslint-disable-next-line no-undef
    await AsyncStorage.removeItem('___token');
    axios.defaults.headers.common.Authorization = undefined;
    NavigationService.navigateToLogin();
  },

  isLoggedIn() {
    return !!this._token;
  },

  login({ email, password }) {
    return axios.post(`${BASE_URL}auth/login`, {
      email,
      password,
    });
  },

  register({ email, password, fullName }) {
    return axios.post(`${BASE_URL}auth/register`, {
      email,
      password,
      fullName,
    });
  },
};

export const Account = {
  getUser() {
    return axios.get(`${BASE_URL}account`);
  },
};

export const Products = {
  fetchLatest() {
    return axios.get(`${BASE_URL}products/latest`);
  },
  fetchMore({ from, limit }) {
    return axios.get(
      `${BASE_URL}products/latest?from=${from}&limit=${limit}`,
    );
  },
  uploadPhotos(url) {
    console.log('url', url);
    const formData = new FormData();
    console.log('afterUrl');
    formData.append('image', {
      uri: url,
      name: 'image',
      type: `image/jpg`,
    });
    console.log('formData', formData);
    return axios.post(`${BASE_URL}upload/images`, formData);
  },
  getById(id) {
    return axios.get(`${BASE_URL}products/${id}`);
  },
  byUserId(id) {
    return axios.get(`${BASE_URL}users/${id}/products`);
  },
  fetchSaved() {
    return axios.get(`${BASE_URL}products/saved`);
  },
  fetchSavedDelete(id) {
    return axios.delete(`${BASE_URL}products/${id}/saved`);
  },
  addToSaved(id) {
    return axios.post(`${BASE_URL}products/${id}/saved`);
  },
  addProduct({
    productTitle,
    productDescription,
    productPhotos,
    productPrice,
    productLocation,
  }) {
    console.log({
      productTitle,
      productDescription,
      productPhotos,
      productPrice,
      productLocation,
    });
    return axios.post(`${BASE_URL}products`, {
      title: productTitle,
      description: productDescription,
      photos: productPhotos,
      price: +productPrice,
      location: productLocation,
    });
  },
};
export const User = {
  getUserById(id) {
    console.log(id);
    return axios.get(`${BASE_URL}users/${id}`);
  },
};

export const Chats = {
  createChat(id, message) {
    return axios.post(`${BASE_URL}products/${id}/createChat`, {
      message,
    });
  },
};
