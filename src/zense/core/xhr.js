import Assure from './assure';

const XHR = {};

XHR.percentComplete = 0;
XHR.storage = null;

XHR.ajax = function ({...options}) {
  let { 
    url, 
    method = 'GET', 
    headers = false, 
    responseType = 'json', 
    widthCredentials = false, 
    data = null 
  } = options;

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);

    if (headers) {
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
    }

    xhr.responseType = responseType.toLowerCase();
    xhr.widthCredentials = widthCredentials;

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    // xhr.onreadystatechange = function () {
    //   if (this.readyState === 4 && this.status === 200) {
    //     if (options.success !== null) {
    //       options.success(JSON.parse(this.responseText));
    //     }
    //   }
    // };

    if (data && typeof data === 'object') {
      data = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');
    }

    xhr.send(data);
  });
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