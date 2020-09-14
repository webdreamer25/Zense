const Storage = {
  default: {
    storeName: '',
    storageType: 'session',
    storage: false,
    keysToStore: []
  },
  settings: {},

  config(options) {
    if (options && typeof options === 'object') {
      let newObj = {};

      for (let key in options) {
        try {
          if (!options.storeName && options.storage) {
            throw new Error('storeName is required.');
          }

          if (key && options[key]) {
            newObj[key] = options[key];
          }
        } catch (err) {
          console.error(err);
        }
      }

      this.default = Object.assign(this.default, newObj);
    }
  },

  set(options) {
    if (options !== undefined && typeof options === 'object') {
      this.settings = Object.assign(this.settings, options);
    }
  },

  initStorage() {
    let data = {};
    let newObj = {};

    if (this.default.storageType === 'local') {
      data = localStorage[this.default.storeName];
    } else {
      data = sessionStorage[this.default.storeName];     
    }
    
    if (data && data !== null) {
      data = JSON.parse(data);
    } else {
      return false;
    }

    for (let key in data) {
      if (key && data[key]) {
        newObj[key] = data[key];
      }
    }

    Object.assign(this.settings, newObj);
  },

  saveToStorage(data) {
    let store = {};

    if (data) {
      store = Object.assign({}, store, data);
    } else {

      // Ensures we only save the specified keys.
      if (this.default.keysToStore.length > 0) {
        for (let i = 0, len = this.default.keysToStore.length; i < len; i++) {
          let name = this.default.keysToStore[i];

          store[name] = this.settings[name];
        }
      }
    }

    if (this.default.storageType === 'local') {
      localStorage[this.default.storeName] = JSON.stringify(store);
    } else {
      sessionStorage[this.default.storeName] = JSON.stringify(store);
    }
  },

  getFromStorage(keyName) {
    let stored = {};

    if (this.default.storageType === 'local') {
      stored = localStorage[this.default.storeName]
    } else {
      stored = sessionStorage[this.default.storeName]
    }

    if (stored && stored !== null) {
      stored = JSON.parse(stored);
    } else {
      return false;
    }

    return keyName && stored ? stored[keyName] : stored;
  }
};

export default Storage;