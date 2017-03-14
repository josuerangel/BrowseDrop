import React from 'react'
import File from './file/File'
import Directory from './Directory'
import UploadBox from './UploadBox'

class Component extends React.Component {
  render () {
    let options = {
      config: {
        caption: {
          maxSize: "archivo grande"
        },
        maxSize: 40,
        //extensionsBlock: ["exe", "xml", "flv", "mp3", "mp4", "avi", "wma"],
        allowDuplicates: false,
        extensions:["png", "jpeg", "gif", "pdf", "docx", "doc"],
        iconHome: false
      }
      ,
   "Data":[
     {
       "id": 0,
       "name": "home",
       "drag": true
     },
      {
         "id":82,
         "parentId":2,
         "name":"camio?n n?on?o.txt",
         "modificado":"2016-09-26 17:44:10.0",
         "url":"../filter/SvtDownloadFile?nameFile=camio?n n?on?o.txt&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/6986aa6fd2b9873d437d5f676fbacfa4.txt",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":2,
            "categoryProposalId":2
         }
      },
      {
         "id":88,
         "parentId":1,
         "name":"camión ñoño.txt",
         "modificado":"2016-09-27 13:52:09.0",
         "url":"../filter/SvtDownloadFile?nameFile=camión ñoño.txt&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/c43c5066cda074f905a1db4013931f11.txt",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":1,
            "categoryProposalId":1
         }
      },
      {
         "id":480,
         "parentId":0,
         "name":"cinco.png",
         "modificado":"2017-01-31 14:50:54.0",
         "url":"../filter/SvtDownloadFile?nameFile=cinco.png&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/cinco_14858958545163.png",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":7,
            "categoryProposalId":7
         }
      },
      {
         "id":1,
         "parentId":0,
         "name":"Datos generales",
         "drag":true,
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":1,
            "categoryProposalId":1
         }
      },
      {
         "id":4,
         "parentId":1,
         "name":"Documentación administrativa y legal",
         "drag":true,
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":4,
            "categoryProposalId":4
         }
      },
      {
         "id":6,
         "parentId":0,
         "name":"Documentación complementaria",
         "drag":true,
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":6,
            "categoryProposalId":6
         }
      },
      {
         "id":5,
         "parentId":0,
         "name":"Documentación financiera",
         "drag":true,
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":5,
            "categoryProposalId":5
         }
      },
      {
         "id":516,
         "parentId":4,
         "name":"dos.png",
         "modificado":"2017-02-01 22:48:03.0",
         "url":"../filter/SvtDownloadFile?nameFile=dos.png&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/dos_14860108830883.png",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":4,
            "categoryProposalId":4
         }
      },
      {
         "id":509,
         "parentId":6,
         "name":"dos.png",
         "modificado":"2017-02-01 22:30:21.0",
         "url":"../filter/SvtDownloadFile?nameFile=dos.png&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/dos_14860098200252.png",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":6,
            "categoryProposalId":6
         }
      },
      {
         "id":520,
         "parentId":0,
         "name":"dos.png",
         "modificado":"2017-02-01 23:18:06.0",
         "url":"../filter/SvtDownloadFile?nameFile=dos.png&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/dos_14860126860426.png",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":7,
            "categoryProposalId":7
         }
      },
      {
         "id":79,
         "parentId":1,
         "name":"miarchivo con.espacio.jpg",
         "modificado":"2016-09-26 12:51:18.0",
         "url":"../filter/SvtDownloadFile?nameFile=miarchivo con.espacio.jpg&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/d3a90d7ad43bb454e0c02b13f29db78f.jpg",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":1,
            "categoryProposalId":1
         }
      },
      {
         "id":489,
         "parentId":0,
         "name":"more40.rar",
         "modificado":"2017-02-01 10:17:57.0",
         "url":"../filter/SvtDownloadFile?nameFile=more40.rar&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/more40_14859658741867.rar",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":7,
            "categoryProposalId":7
         }
      },
      {
         "id":3,
         "parentId":0,
         "name":"Propuesta económica",
         "drag":true,
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":3,
            "categoryProposalId":3
         }
      },
      {
         "id":2,
         "parentId":0,
         "name":"Propuesta técnica",
         "drag":true,
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":2,
            "categoryProposalId":2
         }
      },
      {
         "id":475,
         "parentId":1,
         "name":"tres.png",
         "modificado":"2017-01-31 14:06:03.0",
         "url":"../filter/SvtDownloadFile?nameFile=tres.png&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/tres_14858931628118.png",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":1,
            "categoryProposalId":1
         }
      },
      {
         "id":470,
         "parentId":1,
         "name":"uno.png",
         "modificado":"2017-01-31 10:40:11.0",
         "url":"../filter/SvtDownloadFile?nameFile=uno.png&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/uno_14858808113972.png",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":1,
            "categoryProposalId":1
         }
      },
      {
         "id":515,
         "parentId":4,
         "name":"uno.png",
         "modificado":"2017-02-01 22:47:39.0",
         "url":"../filter/SvtDownloadFile?nameFile=uno.png&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/uno_14860108586125.png",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":4,
            "categoryProposalId":4
         }
      },
      {
         "id":508,
         "parentId":6,
         "name":"uno.png",
         "modificado":"2017-02-01 22:22:22.0",
         "url":"../filter/SvtDownloadFile?nameFile=uno.png&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/uno_14860093425227.png",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":6,
            "categoryProposalId":6
         }
      },
      {
         "id":479,
         "parentId":0,
         "name":"uno.png",
         "modificado":"2017-01-31 14:47:08.0",
         "url":"../filter/SvtDownloadFile?nameFile=uno.png&urlFile=http://849078138bf0516a849b-abe673deb2d00134a784f52da04c0abd.r1.cf2.rackcdn.com/uno_14858956266075.png",
         "extraDataRequest":{
            "smeId":"3083765",
            "subscriptionId":"3084090",
            "actId":"3",
            "lng":"sp",
            "categoryFileId":7,
            "categoryProposalId":7
         }
      }
   ],
   "Lenguaje":{
      "titleName":"Nombre",
      "titleModified":"Modificado",
      "titleDragDropSpace":"Arrastra y suelta los archivos aqui",
      "errorSendFile":"Error inesperado el equipo de Aklara ya fue informado"
   },
   "lng":"sp",
   "extraDataRequest":{
      "smeId":"3083765",
      "subscriptionId":"3084090",
      "actId":"3",
      "lng":"sp",
      "categoryFileId":0,
      "categoryProposalId":0
   }
};

    return (
      <div>
        <UploadBox options={options}></UploadBox>
      </div>
    )
  }
}

module.exports = Component
