import React from 'react'
import File from './file/File'
import Directory from './Directory'
import UploadBox from './UploadBox'

class Component extends React.Component {
  render () {
    let items = [
              {
                  name: "Mahou 5 estrellas",
                  date: '12/03/2017 13:12:55',
                  urlDownload: 'http://www.google.com'
              }, {
                  name: "Cibeles Imperial IPA",
                  date: '12/03/2017 13:12:55',
                  urlDownload: 'www.google.com'
              }, {
                  name: "Chimay Triple",
                  date: '12/03/2017 13:12:55',
                  urlDownload: 'www.google.com'
              }, {
                  name: "First Dr",
                  date: '12/03/2017 13:12:55'
              }, {
                  name: "Second Dir",
                  date: '12/03/2017 13:12:55'
              }
          ];

    return (
      <div>
        <h1>Hello World mundo mundial</h1>
        <UploadBox dataFilesAndDirs={items}></UploadBox>
      </div>
    )
  }
}

module.exports = Component
