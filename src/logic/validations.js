import deepmerge from 'deepmerge';

function allowDuplicates(items, fileList, allow){
  if (allow === undefined) return false;
  for(const file of fileList){
    for(const item of items){
      if(item.name === file.name) return true;
    }
  }
  return false;
}
function maxSize(file, maxSize){
  if(maxSize === undefined) return true;
  return (file.size > maxSize*1024*1024) ? false : true;
}
function getExtension(fileName){
  let dot = fileName.lastIndexOf('.');
  let ext = fileName.substr(dot + 1);
  return ext;
}
function extensions(file, extensions){
  if(extensions === undefined) return true;
  return extensions.includes(getExtension(file.name));
}
function extensionsBlock(file, extensionsBlock){
  if(extensionsBlock === undefined) return false;
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

function Core(fileList, options, items, callback){
  let sendFiles = false;
  callback('holitas mundo callback');
  /**
   * Set default settings and merge with user settings
   */
  let defaultSettings = {
    caption: {
      maxSize: "El archivo es muy grande",
      extensions: "extenion no valida",
      extensionsBlock: "extension no valida",
      allowDuplicates: "Ya existe ese name",
      dragzone: "pon tus files aqui!"
    }
  };
  let settings = deepmerge.all([defaultSettings, options]);
  /**
   * Apply validations
   */
  for(let i = 0, len = fileList.length; i < len; i++){
    if (!extensions(fileList[i], settings.extensions)) return settings.caption.extensions;
    if (!maxSize(fileList[i], 40)) return settings.caption.maxSize;
    if (extensionsBlock(fileList[i], settings.extensionsBlock)) return settings.caption.extensionsBlock;
  }
  if (allowDuplicates(items, fileList, settings.allowDuplicates)) return settings.caption.allowDuplicates;

  if(sendFiles){
    let formData = new FormData();
    for (let x = 0, len = fileList.length; x < len; x++)
      formData.append('file' + x, fileList[x]);
    let self = this;
    fetch('/avatars', {
      method: 'POST',
      body: formData
    }).then(this.checkStatus).then(this.parseJSON).then(function(data) {
      console.log('success', data);
    }).catch(function(error) {
      console.log('error', error);
      self._addNotification(error.message, 'error');
    });
  }
}

module.exports = {
  Core: Core
};
