#react-uploadbox

react-uploadbox is a uploading tool written in ReactJS with UI like DropBox, Drive, etc., drag & drop support and validations.

![react-uploadbox]()

```
options : {
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
    iconHome: false,

    // Callback fired if the uploading succeeds
    // if you need data transform, because react-uploadbox need follow struct:
    onSuccess: function(data) {
      var ObjectSuccessForReactUploadBox = {
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
      return ObjectSuccessForReactUploadBox;
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
  			param2: data.id
        param3: data.name
  		};
  	},

    // Callback fired if the deleting succeeds
    // you need return an object valid check the structure
    // data = data from request
    // itemForDelete = data for item file in react-uploadbox
    onSuccessDeleteFile: function(data, itemForDelete){
      var result = {}
      if (data.result === "OK"){
        return {
          status: 'success',
          message: 'file deleted'
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
    caption: {
      labelValidate: 'Validando',
      labelSend: 'Enviando',
      labelDelete: 'Eliminando',
      labelUploadFile: 'Subir archivo',
      labelBoxFooter: 'Arrastra y suelta los archivos aquí',
      labelDropInTo: 'Soltando en ',
      columnName: 'Nombre',
      columnDate: 'Modificado',
      deleteFileTitle: "Confirmar",
      deleteFileBody: "¿Esta seguro de eliminar este archivo?",
      btnDeleteFileClose: "Cancelar",
      btnDeleteFileSave: "Eliminar",
      errors: {
        maxSize: "file is too large! Please choose another file.",
        extensions: "invalid extension",
        extensionsBlock: "invalid extension",
        allowDuplicates: "File with the same name is already exist."    
      }
    }
  },

  // Array for files and directories
  // if necessary define item with ID = 0, it's root
  data: [

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
      // react-uploadbox use this url for all directories dosen't have url
   		url: "../RelativeUrlForUpload",

      // url for delete file
      // react-uploadbox use this url for all files dosen't have url    
   		urlDelete: "../RelativeUrlForDelete",

      // Extra data for send
      // react-uploadbox use this extra data for all directories and mixed with the specific directory
   		extraDataRequest: {
     		param1: "ok"
   		}
 	  },


    // Detail for directory
    {
      // id unique
   		id: 999,

      // The id of the parent folder. Omitted for the root node.
      parentId: 0

      // name for file or directory
   		name: "Directory 1",

      // allow drag in this directory
   		drag: true,

      // need specific type
   		type: "directory",

      // url for upload file
   		url: "../RelativeUrlForUpload",

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
   		id: 999,

      // The id of the parent folder. Omitted for the root node.
      parentId: 0

      // name for file or directory
   		name: "file.txt",

      // need specific type
      // if null or undefined react-uploadbox take it like a file
   		type: "file",

      // url for download or open file
   		url: "../RelativeUrlForUpload",

      // Show or hide button for delete
      buttonDelete: false,

      // url for delete file
   		urlDelete: "../RelativeUrlForDelete",

      // following params are extra data to send
   		extraParameter1: 'ok'
      extraParameter2: 'ready'
 	  }    
  ]
}
```
