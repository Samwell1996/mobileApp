import { types } from 'mobx-state-tree';
import { OwnProducts } from './Products/OwnProductsStore';

export const UserModel = types
  .model('UserModel', {
    id: types.identifierNumber,
    fullName: types.maybeNull(types.string),
    location: types.maybeNull(types.string),
    avatar: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    createdAt: types.maybeNull(types.string),
    updatedAt: types.maybeNull(types.string),
    email: types.maybeNull(types.string),

    // ownProducts: types.maybeNull(OwnProducts),
  })

  .views((store) => ({
    get initials() {
      const [firstName, lastName] = store.fullName.split(' ');
      return `${firstName[0]} ${lastName[0]}`;
    },
  }));
