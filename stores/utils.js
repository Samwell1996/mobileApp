import {
  applySnapshot,
  getParent,
  getRoot,
  onSnapshot,
  types,
} from 'mobx-state-tree';

export function asyncModel(thunk, auto = true) {
  const model = types
    .model('AsyncModel', {
      isLoading: false,
      isError: false,
    })

    .actions((store) => ({
      start() {
        store.isLoading = true;
        store.isError = false;
      },
      success() {
        store.isLoading = false;
      },
      error(err) {
        store.isLoading = false;
        store.isError = true;
      },

      run(...args) {
        const promise = thunk(...args)(
          store,
          getParent(store),
          getRoot(store),
        );

        if (auto) {
          return store._auto(promise);
        }
        return promise;
      },
      async _auto(promise) {
        try {
          store.start();

          await promise;
          store.success();
        } catch (err) {
          store.error(err);
        }
      },
    }));

  return types.optional(model, {});
  // return model.create({});
}
// export function suspenseModel(thunk) {
//   const model = types
//     .model('SuspenseModel', {})
//     .volatile(() => ({
//       pendingPromise: null,
//       error: null,
//     }))
//
//     .actions((store) => ({
//       setPending(value) {
//         store.pendingPromise = value;
//       },
//
//       setError(value) {
//         store.error = value;
//       },
//
//       read(...args) {
//         if (store.pendingPromise != null) {
//           throw store.pendingPromise;
//         } else if (store.error != null) {
//           throw store.error;
//         }
//
//         const value = thunk(...args)(
//           store,
//           getParent(store),
//           getRoot(store),
//         );
//
//         if (typeof value === 'function') {
//           const promise = value()
//             .then(() => {
//               store.setPending(null);
//             })
//             .catch((err) => {
//               store.setPending(null);
//               err._clear = () => store.setError(null);
//               store.setError(err);
//             });
//           store.setPending(promise);
//
//           throw store.pendingPromise;
//         }
//         return value;
//       },
//     }));
// }
export function createPersist(store) {
  onSnapshot(store, (snapshot) => {
    // eslint-disable-next-line no-undef
    window.localStorage.setItem(
      '__persist',
      JSON.stringify({
        auth: {
          isLoggedIn: snapshot.auth.isLoggedIn,
        },
        viewer: {
          user: snapshot.viewer.user,
        },
      }),
    );
  });

  function rehydrate() {
    // eslint-disable-next-line no-undef
    const snapshot = window.localStorage.getItem('__persist');

    if (snapshot) {
      applySnapshot(store, JSON.parse(snapshot));
    }
  }

  return {
    rehydrate,
  };
}

export function createCollection(ofModel, asyncModels = {}) {
  const collection = types
    .model('CollectionModel', {
      collection: types.map(ofModel),
      ...asyncModels,
    })
    .actions((store) => ({
      add(key, value) {
        store.collection.set(String(key), value);
      },

      get(key) {
        return store.collection.get(String(key));
      },
    }));
  return types.optional(collection, {});
}
