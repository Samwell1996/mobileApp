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
    return axios.get(`${BASE_URL}/account`);
  },
};

export const Products = {
  fetchLatest() {
    return axios.get(`${BASE_URL}/products/latest`);
  },
  fetchMore({ from, limit }) {
    return axios.get(
      `${BASE_URL}/products/latest?from=${from}&limit=${limit}`,
    );
  },
  getById(id) {
    return axios.get(`${BASE_URL}/products/${id}`);
  },
  byUserId(id) {
    return axios.get(`${BASE_URL}/users/${id}/products`);
  },
};
