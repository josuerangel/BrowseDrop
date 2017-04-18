import React from 'react'
import UploadBox from './UploadBox'

class Component extends React.Component {
  render () {
    let options = {
      config: {
        caption: {
          maxSize: "archivo grande"
        },
        maxSize: 40,
        extensionsBlock: ["exe", "xml", "flv", "mp3", "mp4", "avi", "wma"],
        allowDuplicates: false,
        extensions:["png", "jpeg", "gif", "pdf", "docx", "doc"],
        iconHome: true,
        onSuccess: function(data, self){
            console.log('onSuccess outside yeahhh!!', data, self);
        }
      }
      ,
   "Data":[
     {
       "id": 0,
       "name": "home",
       "drag": true,
       "type": "directory",
       "url": "../SvtFileUpload",
       "extraDataRequest": {
         "smeId": "00000000"
       }
     },
     {
        "id":1,
        "parentId":0,
        "name":"Directory",
        "drag":true,
        "type": "directory",
        "url": "urlToUpload",
        "extraDataRequest":{
           "param1":"ok"
        }
     },
     {
        "id":5,
        "parentId":0,
        "name":"document.docx",
        "date":"2017-02-01 10:17:57.0",
        "url":"urlToDownload"
     },
     {
        "id":6,
        "parentId":0,
        "name":"spreadsheet.xls",
        "date":"2017-02-01 10:17:57.0",
        "url":"urlToDownload"
     },
     {
        "id":10,
        "parentId":0,
        "name":"power point.ppt",
        "date":"2017-02-01 10:17:57.0",
        "url":"urlToDownload"
     },
      {
         "id":2,
         "parentId":0,
         "name":"image.png",
         "date":"2017-02-01 22:30:21.0",
         "url":"urlToDownload"
      },
      {
         "id":3,
         "parentId":0,
         "name":"video.mov",
         "date":"2017-02-01 23:18:06.0",
         "url":"urlToDownload"
      },
      {
         "id":7,
         "parentId":0,
         "name":"audio.mp3",
         "date":"2017-02-01 10:17:57.0",
         "url":"urlToDownload"
      },
      {
         "id":9,
         "parentId":0,
         "name":"pdf.pdf",
         "date":"2017-02-01 10:17:57.0",
         "url":"urlToDownload"
      },
      {
         "id":4,
         "parentId":0,
         "name":"compress.rar",
         "date":"2017-02-01 10:17:57.0",
         "url":"urlToDownload"
      },
      {
         "id":8,
         "parentId":0,
         "name":"text.txt",
         "date":"2017-02-01 10:17:57.0",
         "url":"urlToDownload"
      },
      {
         "id":11,
         "parentId":0,
         "name":"other type.exe",
         "date":"2017-02-01 10:17:57.0",
         "url":"urlToDownload"
      }
   ]
};

    return (
      <div>
        <UploadBox options={options}></UploadBox>
      </div>
    )
  }
}

module.exports = Component
