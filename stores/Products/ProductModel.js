import { getRoot, getSnapshot, types } from 'mobx-state-tree';
import { formatRelative, subDays } from 'date-fns';
import { UserModel } from '../UserModel';
import { asyncModel, safeReference } from '../utils';
import { ChatSchema } from '../schema';
import Api from '../../Api';

export const ProductModel = types
  .model('ProductModel', {
    id: types.identifierNumber,
    ownerId: types.number,
    title: types.string,
    description: types.maybeNull(types.string),
    photos: types.maybeNull(types.array(types.string)),
    location: types.string,
    price: types.number,
    saved: false,
    createdAt: types.string,
    updatedAt: types.string,

    owner: types.maybe(safeReference(UserModel)),

    createChat: asyncModel(createChat),
  })

  // .preProcessSnapshot((snapshot) => ({
  //   ...snapshot,
  //   owner: snapshot.ownerId,
  // }))

  .actions((store) => ({
    date() {
      return formatRelative(
        subDays(new Date(), 4),
        new Date(store.createdAt),
      );
    },
    setSaved(saved) {
      store.saved = saved;
    },
    fetchOwner() {
      getRoot(store).entities.users.getById.run(store.ownerId);

      store.owner = store.ownerId;
    },
    async addToSaved() {
      const root = getRoot(store);
      store.setSaved(true);
      root.savedProducts.addItem(store.id);
      Api.Products.addToSaved(store.id);
    },
    async deleteSaved() {
      const root = getRoot(store);
      store.setSaved(false);
      root.savedProducts.removeItem(store.id);
      Api.Products.fetchSavedDelete(store.id);
    },
  }));

function createChat(message) {
  return async function createChatFlow(flow, store) {
    let chatId;

    try {
      flow.start();
      const res = await Api.Chats.createChat(store.id, message);
      chatId = res.data.id;
      res.data.participants = [getSnapshot(store.owner)];

      flow.merge(res.data, ChatSchema);
      flow.success();
    } catch (err) {
      flow.error(err);

      throw err;
    }
  };
}
