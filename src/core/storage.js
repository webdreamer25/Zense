const Storage = {
  uri: '',
  storeName: '',
  storageType: 'sessionStorage',
  storage: false,
  settings: {},
  keysToStore: [],

  config(options) {
    if (options && typeof options === 'object') {
      for (let key in options) {

        try {
          if (!options.storeName && options.storage) {
            throw new Error('storeName is required.');
          }

          this.add(key, options[key]);
        } catch (err) {
          console.error(err);
        }
      }
    }
  },

  add(name, data) {
    if (name && data) {
      this[name] = data;
    }
  },

  initStorage() {
    let data = this.storageType[this.storeName];

    this.uri = window.location.origin + window.location.pathname;
    
    if (data && data !== null) {
      data = JSON.parse(data);
    } else {
      return false;
    }

    for (let key in data) {
      if (this[key]) {
        this[key] = data[key];
      }
    }
  },

  setStore(data) {
    let store = {
      uri: this.uri
    };

    if (data) {
      store = Object.assign({}, store, data);
    } else {
      let newStore = {};

      if (this.keysToStore.length > 0) {
        for (let i = 0, len = this.keysToStore.length; i < len; i++) {
          let name = this.keysToStore[i];

          newStore[name] = this[name];
        }
      }

      store = Object.assign({}, store, newStore);
    }

    this.storageType[this.storeName] = JSON.stringify(store);
  },

  getStore(keyName) {
    let stored = this.storageType[this.storeName];

    if (stored && stored !== null) {
      stored = JSON.parse(stored);
    } else {
      return false;
    }

    return keyName && stored && stored.uri === stored.uri ? stored[keyName] : stored;
  }
};

export default Storage;