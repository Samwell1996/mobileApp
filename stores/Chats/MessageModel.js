import { types } from 'mobx-state-tree';

export const MessageModel = types.model('MessageModel', {
  id: types.identifierNumber,
  chatId: types.number,
  ownerId: types.number,
  text: types.string,
  read: types.boolean,
  createdAt: types.maybeNull(types.string),
  updatedAt: types.maybeNull(types.string),
});
