// Array for files and directories
// if necessary define item with ID = 0, it's root
var dataBroseDrop = [

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
  },

  // this items is only for demo
  // other directory
  {
    // id unique
    id: 444,

    // The id of the parent folder. Omitted for the root node.
    parentId: 999,

    // name for file or directory
    name: "Directory 2",

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
      "param3": "ok"
    }
  },

  {
     id: 1,
     parentId:0,
     name: 'document.docx',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  },
  {
     id: 2,
     parentId: 0,
     name: 'spreadsheet.xlsx',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  },
  {
     id: 3,
     parentId: 0,
     name: 'power point.pptx',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  },
  {
     id: 4,
     parentId: 0,
     name: 'image.png',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  },
  {
     id: 5,
     parentId: 0,
     name: 'video.mov',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  },
  {
     id: 6,
     parentId: 0,
     name: 'audio.mp3',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  },
  {
     id: 7,
     parentId: 0,
     name: 'pdf.pdf',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  },
  {
     id: 8,
     parentId: 0,
     name: 'compress.zip',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  },
  {
     id: 9,
     parentId: 0,
     name: 'text.txt',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  },
  {
     id: 10,
     parentId: 0,
     name: 'other type.exe',
     date: '2017-02-01 10:17:57.0',
     url: 'urlToDownload'
  }
];
