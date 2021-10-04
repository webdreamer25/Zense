const Storage = {
  default: {
    storeName: '',
    storageType: 'session',
    storage: false,
    keysToStore: []
  },
  store: {},

  config(options) {
    if (options && typeof options === 'object') {
      let newObj = {};

      for (let key in options) {
        try {
          if (!options.storeName && options.storage) {
            throw new Error('storeName is required.');
          }

          if (key && options[key]) {
            switch(key) {
              case 'storeName':
              case 'storageType':
                if (typeof options[key] !== 'string') {
                  throw new Error(`The Storage.config() method ${key} needs to be a string type.`);
                }

                break;
              case 'storage':
                if (typeof options[key] !== 'boolean') {
                  throw new Error(`The Storage.config() method ${key} needs to be a boolean.`);
                }

                break;
              case 'keysToStore':
                if (!Array.isArray(options[key])) {
                  throw new Error(`The Storage.config() method ${key} needs to be an array.`);
                }

                break;
              default:
                //nothing.
            }

            newObj[key] = options[key];
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (newObj.storeName && newObj.storeName === '' || !newObj.storeName && this.default.storeName === '') {
        let id = new Date().getMilliseconds();

        newObj.storeName = `store-${id}`;
      }

      this.default = Object.assign(this.default, newObj);
    }
  },

  set(options) {
    try {
      if (options !== undefined && typeof options === 'object') {
        this.store = Object.assign(this.store, options);
      } else {
        throw new Error('Options must be passed in as an object.');
      }
    } catch(err) {
      console.error(err);
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

    Object.assign(this.store, newObj);
  },

  saveStore({ 
    data = false, 
    storeName = this.default.storeName, 
    storageType = this.default.storageType,
    extendSettings = true
  } = {}) {
    let store = {};

    try {
      if (data) {
        if ((typeof data !== 'object' || Array.isArray(data)) && extendSettings) {
          throw new Error('Storage error: Cannot extend data of type object.');
        }

        store = extendSettings ? Object.assign({}, this.store, data) : data;
      } else if (this.default.keysToStore.length > 0) {

        // Ensures we only save the specified keys.  
        for (let i = 0, len = this.default.keysToStore.length; i < len; i++) {
          let name = this.default.keysToStore[i];

          store[name] = this.store[name];
        }

      } else {
        store = this.store;
      }
    } catch(err) {
      console.error(err);
    }

    if (storageType === 'local') {
      localStorage[storeName] = JSON.stringify(store);
    } else {
      sessionStorage[storeName] = JSON.stringify(store);
    }
  },

  getStore({ 
    keyName = false, 
    storeName = this.default.storeName, 
    storageType = this.default.storageType
  } = {}) {
    let stored = {};

    if (storageType === 'local') {
      stored = localStorage[storeName]
    } else {
      stored = sessionStorage[storeName]
    }

    if (stored && stored !== null) {
      stored = JSON.parse(stored);
    } else {
      return false;
    }

    return keyName ? stored[keyName] : stored;
  },

  removeFromStore(name, storageType = this.default.storageType) {
    if (typeof name === 'string') {
      if (storageType === 'local') {
        localStorage.removeItem(name);
      } else {
        sessionStorage.removeItem(name);
      }
    }
  },

  clearStore() {
    if (this.default.storageType === 'local') {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  }
};

export default Storage;