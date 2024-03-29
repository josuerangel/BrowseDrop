import deepmerge from 'deepmerge';
import 'whatwg-fetch';

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };
}

let defaultSettings = {
  caption: {
    errors: {
      maxSize: "File is too large!, Please choose another file.",
      extensions: "Invalid extension",
      extensionsBlock: "Invalid extension",
      allowDuplicates: "File with the same name is already exist."
    }
  }
};

function allowDuplicates(itemsBox, file, allow) {
  console.log('validations allowDuplicates: ', itemsBox, file, allow);
  if (allow === undefined) return false;
  /*for (let item of itemsBox)
    if (item.name === file.name) return true;*/
  for (let x = 0, len = itemsBox.length; x < len; x++)
    if (itemsBox[x].name === file.name) return true;
  return false;
}

function maxSize(file, maxSize) {
  console.log('validations maxSize: ', file, maxSize);
  if (maxSize === undefined) return true;
  return (file.size > maxSize * 1024 * 1024) ? false : true;
}

function getExtension(fileName) {
  let dot = fileName.lastIndexOf('.');
  let ext = fileName.substr(dot + 1);
  return ext;
}

function extensions(file, extensions) {
  console.log('validations extensions: ', file, extensions);
  if (extensions === undefined) return true;
  return extensions.includes(getExtension(file.name));
}

function extensionsBlock(file, extensionsBlock) {
  console.log('validations extensionsBlock: ', file, extensionsBlock);
  if (extensionsBlock === undefined) return false;
  return extensionsBlock.includes(getExtension(file.name));
}

function checkStatus(response) {
  console.log('checkStatus.....');
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  console.log('parseJSON .......');
  return response.json();
}

function sendFile(directory, settings, file, notificationId, callback) {
  console.log('sendFile: ', directory, settings, file, notificationId, callback);

  let formData = new FormData();
  formData.append(file.name, file);
  console.log('sendFile formData: ', formData);

  /**
   * Set url to send file, check url direcotry selected if don't existe value,
   * use url value from directory Home, if necessary existe someone url
   */
  let urlToSend = "";
  if (directory.url !== undefined && directory.url !== "")
    urlToSend = directory.url;
  else
    urlToSend = settings.directoryHome.url;
  if (urlToSend === "") console.log('Is necessary someone url to send file');

  /**
   * Set extra data for request, merge directory selected with directory home
   */
  let extraDataDirectory = (directory.extraDataRequest !== undefined) ? directory.extraDataRequest : {};
  let extraDataHome = (settings.directoryHome.extraDataRequest !== undefined) ? settings.directoryHome.extraDataRequest : {};
  let extraData = deepmerge.all([{}, extraDataHome, extraDataDirectory]);
  if (extraData !== undefined)
    for (let attr in extraData)
      formData.append(attr, extraData[attr]);
  console.log('sendFile extraData OK');

  /**
   * Send file to url
   */
  fetch(urlToSend, {
    method: 'POST',
    credentials: 'same-origin',
    body: formData
  }).then(checkStatus).then(parseJSON).then(function(data) {
    console.log('sendFile success: ', data);

    let message = {};

    message = {
      status: (data.status !== undefined) ? data.status : "error",
      message: (data.message !== undefined) ? data.message : "",
      item: (data.item !== undefined) ? data.item : {},
      idNotification : notificationId,
    };
    console.log('sendFile success message: ', message);

    if(typeof settings.onSuccess === 'function'){
      message = settings.onSuccess(data);
      message.idNotification = notificationId;
      console.log('sendFile success message after urser function: ', message);
    }

    callback(message);
  }).catch(function(error) {
    console.log('sendFile error: ', error);
    let message = null;
    if (error.response == undefined){
      message = {
        status: "danger",
        message: "Error in file: " + error.fileName + ", lineNumber: " + error.lineNumber +  ", message: " + error.message,
        idNotification: notificationId,
        item: {}
      };
    }
    else {
      message = {
        status: "danger",
        message: error.response.status + " - " + error.message + ' -- ' + error.response.url,
        idNotification: notificationId,
        item: {}
      };
    }
    console.log('sendFile error message: ', message);
    callback(message);
  });
}

function parseMessageValidation(text, opts, file) {
  console.log('parseMessageValidation', text, opts, file);
  const data = {
    fileName : file.name,
    extensionsBlock: opts.extensionsBlock,
    maxSize: opts.maxSize
  };

  if (text.map != undefined){
    return text.map((item, key) => {
      return parseMessageValidationString(item, data);
    })
  }
  else{
    return parseMessageValidationString(text, data);
  }
}

function parseMessageValidationString(text, data){
  switch (typeof(text)) {
      case "string":
          return text.replace(/\{\{bd-(.*?)\}\}/g, function(i, match) {
              return data[match];
          });
          break;
      default:
          return text;
  }
}

/**
 * Apply validations, and return message
 */
function applyValidation(file, settings, itemsBox) {
  console.log('applyValidation settings: ', settings);
  console.log('applyValidation settings: ', settings.caption.errors.extensions);

  if (!extensions(file, settings.extensions)) return parseMessageValidation(settings.caption.errors.extensions, settings, file);
  if (!maxSize(file, settings.maxSize)) return parseMessageValidation(settings.caption.errors.maxSize, settings, file);
  if (extensionsBlock(file, settings.extensionsBlock)) return parseMessageValidation(settings.caption.errors.extensionsBlock, settings, file);
  if (allowDuplicates(itemsBox, file, settings.allowDuplicates)) return settings.caption.errors.allowDuplicates;
  console.log('applyValidation finish');
}


function processFile(file, settings, itemsBox, callback) {
  let message = applyValidation(file, settings, itemsBox);
  if (message === undefined)
    sendFile(file, callback);
  else
    callback(message);
}

function CoreSingleFile(directory, file, settings, itemsBox, notificationId, callback){
  console.log('CoreSingleFile: ', directory, file, settings, itemsBox, notificationId, callback);
  const settingsSingle = deepmerge.all([defaultSettings, settings]);
  console.log('CoreSingleFile deepmerge: ', settingsSingle);
  let message = applyValidation(file, settingsSingle, itemsBox);
  console.log('CoreSingleFile applyValidation message returned: ', message);
  if (message === undefined){
    const messageSend = (settings.caption.labelSend === undefined) ? 'Sending' : settings.caption.labelSend;
    const dataResponse = {
      status: 'info',
      message: messageSend,
      idNotification: notificationId,
      item: {}
    };
    callback(dataResponse);
    setTimeout(function(){
      sendFile(directory, settings, file, notificationId, callback);
    },1000);
  }
  else {
    const dataResponse = {
      status: 'danger',
      message: message,
      idNotification: notificationId,
      dissmiss: 10,
      item: {}
    };
    console.log('CoreSingleFile before to callback dataResponse: ', dataResponse);
    callback(dataResponse);
  }
}

/**
 * Set default settings, merge with user settings
 * Process files and execute callback for each
 */
function Core(fileList, options, itemsBox, callback) {
  //callback('holitas mundo callback');
  let settings = deepmerge.all([defaultSettings, options]);
  for (let x = 0, len = fileList.length; x < len; x++) {
    processFile(fileList[x], settings, itemsBox, callback);
  }
}

/*
module.exports = {
  Core: Core,
  CoreSingleFile: CoreSingleFile
};*/

export { Core, CoreSingleFile }