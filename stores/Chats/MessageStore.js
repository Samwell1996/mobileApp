import { getParent, types } from 'mobx-state-tree';
import { asyncModel } from '../utils';
import { MessageModel } from './MessageModel';
import Api from '../../Api';
import { ChatCollectionSchema } from '../schema';

export const MessageStore = types
  .model('MessageStore', {
    items: types.array(types.reference(MessageModel)),

    fetchMessages: asyncModel(fetchMessages),
  })

  .views((store) => ({
    get asList() {
      return store.items.slice();
    },
    get chatId() {
      return getParent(store).id;
    },
  }))
  .actions((store) => ({
    runInAction(cb) {
      cb(store);
    },
    handleMessage(message) {
      console.log('Handle message');
    },
  }));

function fetchMessages(id) {
  return async function fetchMessagesFlow(flow, store) {
    try {
      const res = await Api.Chats.getMessages(id);
      console.log(res, 'resMessages');
      const results = flow.merge(res.data, ChatCollectionSchema);
      console.log('results', results);
      store.runInAction((self) => {
        self.items = results;
      });
    } catch (e) {
      console.log(e);
    }
  };
}
