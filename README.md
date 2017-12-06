# Browse Drop

BrowseDrop is a uploading tool written in ReactJS with UI like DropBox, Drive, etc., support drag & drop and validations.

![](https://github.com/josuerangel/BrowseDrop/blob/master/images/browsedrop.gif)


![browsedrop]()

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

    // Callback fired when clicked menu item
    // directory = Rendered directory
    changeDirectory: function(directory){
      // this example show or hide something when is home
			(directory.id == 0) ? $("#something").show() : $("#something").hide();
		},

    // Callback fired if the uploading request succeeds
    // if you need data transform
    onSuccess: function(data) {
      // BrowseDrop need the follow structure for message response
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

    // Callback fired after when file is added
    // itemAdded = item was removed
    // Directory = Rendered directory
    // BrowseDrop = instance from BrowseDrop, you can interact with the API
    afterAddFile: function(itemAdded, Directory, BrowseDrop){

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
    // itemForDelete = data for item file in BrowseDrop
    onSuccessDeleteFile: function(data, itemForDelete){
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

    // Callback fired after when file is removed
    // itemDeleted = item was removed
    // Directory = Rendered directory
    // BrowseDrop = instance from BrowseDrop, you can interact with the API
    afterDeleteFile: function(itemDeleted, Directory, BrowseDrop){

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
      // BrowseDrop use this url for all directories dosen't have url
      url: "../RelativeUrlForUpload",

      // url for delete file
      // BrowseDrop use this url for all files dosen't have url
      urlDelete: "../RelativeUrlForDelete",

      // Extra data for send
      // BrowseDrop use this extra data for all directories and mixed with the specific directory
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

      // you can display a string in column Date
      date: "-",

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
      // if null or undefined BrowseDrop take it like a file
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
