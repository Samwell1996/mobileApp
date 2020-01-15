import { getParent, types } from 'mobx-state-tree';
import { asyncModel } from '../utils';
import { MessageModel } from './MessageModel';

export const MessageStore = types
  .model('MessageStore', {
    items: types.array(types.reference(MessageModel)),

    fetch: asyncModel(fetchMessages),
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

function fetchMessages() {
  return async function fetchChatsFlow() {};
}
