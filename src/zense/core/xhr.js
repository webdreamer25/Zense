import Assure from "./assure";
import { rejects } from "assert";

const XHR = Object.create(Assure);

XHR.percentComplete = 0;
XHR.storage = null;

XHR.ajax = function (options) {
  let defaults = {
    method: 'GET',
    data: null,
    success: null
  };

  options = Object.assign({}, defaults, options);

  this.xhr = new XMLHttpRequest();

  this.xhr.open(options.method, options.url);

  if (options.method.toLowerCase() === 'post') {
    for (let i = 0; i < options.headers.length; i++) {
      let header = options.headers[i];

      this.xhr.setRequestHeader(header.name, header.value);
    }
  }

  this.xhr.addEventListener('error', this.error.bind(this));
  this.xhr.addEventListener('abort', this.abort.bind(this));
  // this.xhr.addEventListener('load', this.success.bind(this));
  // this.xhr.addEventListener('loadend', this.complete.bind(this));
  this.xhr.addEventListener('progress', this.updateProgress.bind(this));

  if (options.responseType) {
    this.xhr.responseType = options.responseType.toLowerCase();
  }

  if (options.withCredentials) {
    this.xhr.widthCredentials = true;
  }

  this.xhr.onreadystatechange = this.createPromise(function (resolve, reject) {
    if (this.readyState === 4 && this.status === 200) {
      // if (options.success !== null) {
        // options.success(JSON.parse(this.responseText));
        resolve(JSON.parse(this.responseText));
      // }
    } else {
      let error = new Error('failed');
      reject(error);
    }
  }.bind(this));

  this.xhr.send(options.data);
};

XHR.error = function () {
  console.log('There was an error with your XHR request');
};

XHR.abort = function () {
  console.log('Aborted your XHR request.');
};

XHR.updateProgress = function (eventObj) {
  if (eventObj.lengthComputable) {
    this.percentComplete = eventObj.loaded / eventObj.total * 100;
  } else {
    Internal.warnings.push({
      type: 'XHR.' + this.methodType,
      description: 'Unable to update "' + this.methodType + '" xhr request progress.'
    });
  }
};

export default XHR;