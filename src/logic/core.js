import deepmerge from 'deepmerge';
import 'whatwg-fetch';

let defaultSettings = {
  caption: {
    maxSize: "El archivo es muy grande",
    extensions: "extenion no valida",
    extensionsBlock: "extension no valida",
    allowDuplicates: "Ya existe ese name",
    dragzone: "pon tus files aqui!"
  }
};

function allowDuplicates(itemsBox, file, allow) {
  if (allow === undefined) return false;
  for (const item of itemsBox)
    if (item.name === file.name) return true;
  return false;
}

function maxSize(file, maxSize) {
  if (maxSize === undefined) return true;
  return (file.size > maxSize * 1024 * 1024) ? false : true;
}

function getExtension(fileName) {
  let dot = fileName.lastIndexOf('.');
  let ext = fileName.substr(dot + 1);
  return ext;
}

function extensions(file, extensions) {
  if (extensions === undefined) return true;
  return extensions.includes(getExtension(file.name));
}

function extensionsBlock(file, extensionsBlock) {
  if (extensionsBlock === undefined) return false;
  return extensionsBlock.includes(getExtension(file.name));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function sendFile(file, callback) {
  let formData = new FormData();
  formData.append(file.name, file);
  fetch('/avatars', {
    method: 'POST',
    body: formData
  }).then(checkStatus).then(parseJSON).then(function(data) {
    console.log('success', data);
    callback(data);
  }).catch(function(error) {
    let errorMessage = {
      title: error.message,
      message: error.message + ' -- ' + error.response.url,
      level: 'error'
    };
    callback(errorMessage);
  });
}

/**
 * Apply validations, and return message
 */
function applyValidation(file, settings, itemsBox) {
  if (!extensions(file, settings.extensions)) return settings.caption.extensions;
  if (!maxSize(file, 40)) return settings.caption.maxSize;
  if (extensionsBlock(file, settings.extensionsBlock)) return settings.caption.extensionsBlock;
  if (allowDuplicates(itemsBox, file, settings.allowDuplicates)) return settings.caption.allowDuplicates;
}


function processFile(file, settings, itemsBox, callback) {
  let message = applyValidation(file, settings, itemsBox);
  if (message === undefined)
    sendFile(file, callback);
  else
    callback(message);
}

function CoreSingleFile(file, settings, itemsBox, notificationId, callback){
  let settingsSingle = deepmerge.all([defaultSettings, settings]);
  let message = applyValidation(file, settingsSingle, itemsBox);
  if (message === undefined)
    sendFile(file, callback);
  else {
    let dataResponse = {
      type: 'error',
      message: message,
      notificationId: notificationId
    };
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

module.exports = {
  Core: Core,
  CoreSingleFile: CoreSingleFile
};
