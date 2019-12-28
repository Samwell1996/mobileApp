import Api from '../../Api';
import { createCollection, asyncModel } from '../utils';
import { useStore } from '../createStore';
import { UserModel } from '../UserModel';

export function useUsersCollection() {
  const store = useStore();
  return store.entities.users;
}

export const UsersCollection = createCollection(UserModel, {

});
