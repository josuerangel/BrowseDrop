import "whatwg-fetch";

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

export function CoreDeleteFile(file, home, settings, notificationId, callback) {
  console.log("CoreDeleteFile: ", file, home, settings, notificationId);
  let dataToSend = {};

  if (typeof settings.beforeSendDeleteFile === "function") {
    dataToSend = settings.beforeSendDeleteFile(file);
    console.log("deleteFile beforeDeleteFile: ", dataToSend);
  } else dataToSend = file;

  let urlToSend = home.urlDelete + "?vBD=0.1.0";

  console.log(
    "settings onlyBeforeSendDeletFile: ",
    settings.onlyDataBeforeSendDeleteFile
  );
  if (settings.onlyDataBeforeSendDeleteFile !== true)
    for (let attr in file) urlToSend += "&" + attr + "=" + file[attr];

  for (let attr in dataToSend) urlToSend += "&" + attr + "=" + dataToSend[attr];

  fetch(urlToSend, {
    method: "GET",
    credentials: "same-origin",
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      console.log("deleteFile success: ", data);

      let message = {};

      message = {
        status: data.status !== undefined ? data.status : "error",
        message: data.message !== undefined ? data.message : "",
        item: data.item !== undefined ? data.item : {},
        notificationId: notificationId,
      };
      console.log("deleteFile success message: ", message);

      if (typeof settings.onSuccessDeleteFile === "function") {
        message = settings.onSuccessDeleteFile(data, file);
        console.log(
          "deleteFile success message after urser function: ",
          message
        );
      }
      message.notificationId = notificationId;
      callback(message);
    })
    .catch(function (error) {
      console.log("deleteFile error: ", error);
      if (error.response === undefined) return;
      const message = {
        status: "danger",
        message:
          error.response.status +
          " - " +
          error.message +
          " -- " +
          error.response.url,
        item: {},
        notificationId: notificationId,
      };
      console.log("deleteFile error message: ", message);
      callback(message);
    });
}

//module.exports = { CoreDeleteFile: CoreDeleteFile };
// export default CoreDeleteFile;
