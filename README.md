#react-browsedrop

react-browsedrop is a uploading tool written in ReactJS with UI like DropBox, Drive, etc., drag & drop support and validations.

![react-browsedrop]()

```
const options = {
  config: {

    //file's maximal size in MB
    //if null or undefined - has no limits
    maxSize: 40,

    //Blocked extensions
    extensionsBlock: ["exe", "xml", "flv", "mp3", "mp4", "avi", "wma"],

    //Valid extensions
    extensions:["png", "jpeg", "gif", "pdf", "docx", "doc"],

    //block or allow duplicates in all directories
    //if null or undefined allow duplicates
    allowDuplicates: false,

    //Show or hide button for upload file
    //if null or undefined show button
    buttonUpload: false,

    //Show or hide icon home
    //if null or undefined show name for the item with id 0 (if necessary item with id 0)
    iconHome: true,

    // Callback fired if the uploading succeeds
    // if you need data transform, because react-browsedrop need follow struct:
    onSuccess: function(data) {
      var ObjectSuccessForReactBrowseDrop = {
        status: 'success',
        message: 'message for show',
        //item valid, see spec for details
        item: {
          id: data.id,
          parentId: data.parentId,
          name: data.name,
          date: data.date,
          url: data.url
        }
      }
      return ObjectSuccessForReactBrowseDrop;
    },


    // Flag for define which data send, when is true only send data returned in method beforeSendDeleteFile
    // Caution if true and beforeSendDeleteFile is undefined don't send params in the request
    onlyDataBeforeSendDeleteFile: false,


    // Callback fired before deleting file
    // here you can add extra data or transform it before to delete
    // data = info for item file
    beforeSendDeleteFile: function(data){
      return {
        param1: 'ok',
        param2: data.id,
        param3: data.name
      };
    },


    // Callback fired if the deleting succeeds
    // you need return an object valid check the structure
    // data = data from request
    // itemForDelete = data for item file in react-browsedrop
    onSuccessDeleteFile: function(data, itemForDelete){
      var result = {}
      if (data.result === "OK"){
        return {
          status: 'success',
          message: 'file deleted',
          item: itemForDelete
        };
      }
      else {
        return {
          status: 'error',
          message: 'we can\'t delete',
          item: itemForDelete
        }
      }
    },


    // Captions
    // By default language is English, but you can personalize your messages
    caption: {
      labelValidate: 'Validating',
      labelSend: 'Sending',
      labelDelete: 'Deleting',
      labelUploadFile: 'Upload file',
      labelBoxFooter: 'Drag and drop your files here!',
      labelDropInTo: 'Drop in ',
      columnName: 'Name',
      columnDate: 'Date',
      deleteFileTitle: "Confirm",
      deleteFileBody: "¿Are you sure to delete this file?",
      btnDeleteFileClose: "Cancel",
      btnDeleteFileSave: "Delete",
      tooltipButtonDelete: 'Delete file',
      tooltipButtonDownload: 'Download compress file',
      errors: {
        maxSize: "File is too large! Please choose another file",
        extensions: "Invalid extension",
        extensionsBlock: "Invalid extension",
        allowDuplicates: "File with the same name is already exist"
      }
    }
  },

  // Array for files and directories
  // if necessary define item with ID = 0, it's root
  Data: [

    //Detail for root directory
    {
      // ID only root have 0
      id: 0,

      // name for file or directory
      // name displayed in menu when iconHome is false
      name: "home",

      // allow drag in this directory
      drag: true,

      // need specific type
      type: "directory",

      // url for upload file
      // react-browsedrop use this url for all directories dosen't have url
      url: "../RelativeUrlForUpload",

      // url for delete file
      // react-browsedrop use this url for all files dosen't have url
      urlDelete: "../RelativeUrlForDelete",

      // Extra data for send
      // react-browsedrop use this extra data for all directories and mixed with the specific directory
      extraDataRequest: {
        param1: "ok"
      }
    },


    // Detail for directory
    {
      // id unique
      id: 999,

      // The id of the parent folder. Omitted for the root node.
      parentId: 0,

      // name for file or directory
      name: "Directory 1",

      // allow drag in this directory
      drag: true,

      // need specific type
      type: "directory",

      // url for upload file
      url: "../RelativeUrlForUpload",

      // Show or hide button for download compress file
      buttonDownload: true,

      // url for delete file
      urlDelete: "../RelativeUrlForDelete",

      // Extra data for send
      extraDataRequest: {
        "param2": "ok"
      }
    },

    // Detail for file
    {
      // id unique
      id: 998,

      // The id of the parent folder. Omitted for the root node.
      parentId: 999,

      // name for file or directory
      name: "text.txt",

      // need specific type
      // if null or undefined react-browsedrop take it like a file
      type: "file",

      // url for download or open file
      url: "../RelativeUrlForUpload",

      // Show or hide button for delete
      buttonDelete: false,

      // url for delete file
      urlDelete: "../RelativeUrlForDelete",

      // following params are extra data to send
      extraParameter1: 'ok',
      extraParameter2: 'ready'
    }
  ]
}; // end options
```
