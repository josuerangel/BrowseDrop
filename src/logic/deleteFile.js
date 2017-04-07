import 'whatwg-fetch';

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

function CoreDeleteFile(file, home, settings, callback){
  console.log('CoreDeleteFile: ', file, home, settings);
  let dataToSend = {};
  // let formData = new FormData();
  // for (let attr in this.props.data)
  //   formData.append(attr, extraData[attr]);

  if(typeof settings.beforeSendDeleteFile === 'function'){
    dataToSend = settings.beforeSendDeleteFile(file);
    console.log('deleteFile beforeDeleteFile: ', dataToSend);
  }
  else dataToSend = file;

  let urlToSend = home.urlDelete + '?vUPB=1';
  for (let attr in dataToSend)
    urlToSend += '&' + attr + '=' + dataToSend[attr];

  fetch(urlToSend, {
    method: 'GET',
    credentials: 'same-origin',
  }).then(checkStatus).then(parseJSON).then(function(data) {
    console.log('deleteFile success: ', data);

    let message = {};

    message = {
      status: (data.status !== undefined) ? data.status : "error",
      message: (data.message !== undefined) ? data.message : "",
      item: (data.item !== undefined) ? data.item : {}
    };
    console.log('deleteFile success message: ', message);

    if(typeof settings.onSuccessDeleteFile === 'function'){
       message = settings.onSuccessDeleteFile(data, file);
       console.log('deleteFile success message after urser function: ', message);
    }

    callback(message);
  }).catch(function(error) {
    console.log('deleteFile error: ', error);
    const message = {
      status: "danger",
      message: error.response.status + " - " + error.message + ' -- ' + error.response.url,
      item: {}
    };
    console.log('deleteFile error message: ', message);
    callback(message);
  });
}

module.exports = { CoreDeleteFile: CoreDeleteFile };
