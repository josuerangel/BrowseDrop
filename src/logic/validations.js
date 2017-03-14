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

function Core(fileList, options, items){
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
}

module.exports = {
  Core: Core
};
