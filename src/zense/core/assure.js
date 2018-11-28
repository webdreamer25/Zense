const Assure = {};

Assure.promise = function (...options) {
  let { bool, data, errorMessage } = options;

  return new Promise(
    (resolve, reject) => {
      if (bool) {
        resolve(data);
      } else {
        let reason = new Error(errorMessage);

        reject(reason);
      }
    }
  );
};

Assure.request = function (promise) {
  promise
    .then(fulfilled => {
      console.log(fullfilled)
    })
    .catch(error => {
      console.log(error.message)
    });
};
