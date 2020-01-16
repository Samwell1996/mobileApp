import { types } from 'mobx-state-tree';
import { formatRelative, subDays } from 'date-fns';
import { ProductModel } from '../Products/ProductModel';
import { UserModel } from '../UserModel';
import { MessageModel } from './MessageModel';

export const ChatModel = types
  .model('ChatModel', {
    id: types.identifierNumber,
    productId: types.number,
    ownerId: types.number,
    createdAt: types.maybeNull(types.string),
    updatedAt: types.maybeNull(types.string),
    message: types.reference(MessageModel),
    product: types.reference(ProductModel),

    user: types.reference(UserModel),
  })

  .preProcessSnapshot((snapshot) => {
    return {
      ...snapshot,
      product: snapshot.product || snapshot.productId,
      participants: undefined,
      user: snapshot.participants[0],
    };
  })
  .actions((store) => ({
    date() {
      return formatRelative(
        subDays(new Date(), 0),
        new Date(store.createdAt),
      );
    },
  }));
