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

function sendFile(directory, settings, file, notificationId, callback) {
  console.log('sendFile: ', directory, settings, file, notificationId, callback);

  let formData = new FormData();
  formData.append(file.name, file);

  if(typeof settings.onSuccess == 'function')
    settings.onSuccess();


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

  fetch(urlToSend, {
    method: 'POST',
    body: formData
  }).then(checkStatus).then(parseJSON).then(function(data) {
    console.log('success', data);
    const message = {
      status: (data.status !== undefined) ? data.status : "error",
      message: (data.message !== undefined) ? data.message : "",
      idNotification : notificationId,
      item: (data.item !== undefined) ? data.item : {}
    };
    callback(message);
  }).catch(function(error) {
    const item = {
      id:10040,
      parentId: 1,
      name: "nuevo file.png",
      modificado:"2016-09-26 17:44:10.0",
      url:"../filter/SvtDownloadFile?nameFile=camio?n n?on?o.txt&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/6986aa6fd2b9873d437d5f676fbacfa4.txt"
    };
    const message = {
      status: "error",
      message: error.message + ' -- ' + error.response.url,
      idNotification: notificationId,
      item: item
    };
    callback(message);
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

function CoreSingleFile(directory, file, settings, itemsBox, notificationId, callback){
  console.log('CoreSingleFile: ', directory, file, settings, itemsBox, notificationId, callback);
  let settingsSingle = deepmerge.all([defaultSettings, settings]);
  let message = applyValidation(file, settingsSingle, itemsBox);
  if (message === undefined)
    sendFile(directory, settings, file, notificationId, callback);
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
