const Assure = {};

Assure.promise = null;

Assure.createPromise = function (callback) {
  this.promise = new Promise(callback);
};

Assure.requestPromise = function (promise) {
  promise
    .then(fulfilled => {
      console.log(fulfilled)
      return fulfilled;
    })
    .catch(error => {
      console.log(error.message);
    });
};

Assure.async = async function (promise) {
  let result = await this.requestPromise(promise);
  return result;
};

export default Assure;
