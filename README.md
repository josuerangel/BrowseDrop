#react-uploadbox

react-uploadbox is a uploading tool written in ReactJS with UI like DropBox, Drive, etc., drag & drop support and validations.
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
  }
}
```
