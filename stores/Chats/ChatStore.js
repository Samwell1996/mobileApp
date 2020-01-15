import { types } from 'mobx-state-tree';
import { ChatModel } from './ChatModel';
import { asyncModel } from '../utils';
import Api from '../../Api';
import { ChatCollectionSchema } from '../schema';

export const ChatStore = types
  .model('ChatStore', {
    items: types.array(types.reference(ChatModel)),

    fetchChats: asyncModel(fetchChats),
  })

  .views((store) => ({
    getById(id) {
      return store.items.find((i) => i.id === id);
    },
  }))
  .actions((store) => ({
    runInAction(cb) {
      cb(store);
    },
    handleMessage(message) {
      console.log('Handle message');
    },
    setItems(items) {
      store.items = items;
    },
  }));

function fetchChats() {
  return async function fetchChatsFlow(flow, store) {
    try {
      const res = await Api.Chats.getChats();
      console.log(res, 'res');
      const results = flow.merge(res.data, ChatCollectionSchema);
      console.log(results, 'results');
      store.runInAction((self) => {
        self.items = results;
      });
    } catch (e) {
      console.log(e);
    }
  };
}
