import React from 'react'
import PropTypes from 'prop-types'
import './icon-file.styl'
import mime from 'mime-types'
import mimedb from 'mime-db'
import FaFileO from 'react-icons/lib/fa/file-o'
import FaFolderOpen from 'react-icons/lib/fa/folder-open'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaFileImageO from 'react-icons/lib/fa/file-image-o'
import FaFileArchiveO from 'react-icons/lib/fa/file-archive-o'
import FaFileAudioO from 'react-icons/lib/fa/file-audio-o'
import FaFileTextO from 'react-icons/lib/fa/file-text-o'
import FaFileMovieO from 'react-icons/lib/fa/file-movie-o'
import FaFileWordO from 'react-icons/lib/fa/file-word-o'
import FaFileExcelO from 'react-icons/lib/fa/file-excel-o'
import FaFilePdfO from 'react-icons/lib/fa/file-pdf-o'
import FaFilePowerpointO from 'react-icons/lib/fa/file-powerpoint-o'

class IconFile extends React.Component{
  constructor(props) {
    super(props);
  }
  setIcon(){
    return (this.props.type === "directory")
      ? <FaFolderOpen className="upb__itembox__icon" />
    : this.setIconFile(this.props.name);
  }
  setIconFile(name){
    console.log('setIconFile name:', name);
    console.log('setIconFile mime', mime.lookup(name));
    let arrType
    if (mime.lookup(name))
      arrType = mime.lookup(name).split("/");
    else
      arrType = ["noapplication"];

    let result = null;
    console.log('setIconFile arrType: ', arrType);
    switch (arrType[0]) {
      case 'image':
        result = <FaFileImageO className="upb__itembox__icon"></FaFileImageO>;
        break;
      case 'audio':
        result = <FaFileAudioO className="upb__itembox__icon upb__itembox__icon__audio"></FaFileAudioO>;
        break;
      case 'video':
        result = <FaFileMovieO className="upb__itembox__icon upb__itembox__icon__video"></FaFileMovieO>;
        break;
      case 'text':
        result = <FaFileTextO className="upb__itembox__icon upb__itembox__icon__text"></FaFileTextO>
        break;
      case 'application':
        result = this.setIconFileApplication(arrType[1]);
        break;
      default:
        result = <FaFileO className="upb__itembox__icon"/>;
    }
    return result;
  }
  setIconFileApplication(application){
    if (application.search('compress') !== -1 || application.search('zip') !== -1) return <FaFileArchiveO className="upb__itembox__icon upb__itembox__icon__compress"></FaFileArchiveO>;
    if (application.search('excel') !== -1 || application.search('spreadsheet') !== -1) return <FaFileExcelO className="upb__itembox__icon upb__itembox__icon__excel"></FaFileExcelO>;
    if (application.search('pdf') !== -1) return <FaFilePdfO className="upb__itembox__icon upb__itembox__icon__pdf"></FaFilePdfO>;
    if (application.search('powerpoint') !== -1 || application.search('presentation') !== -1) return <FaFilePowerpointO className="upb__itembox__icon upb__itembox__icon__powerpoint"></FaFilePowerpointO>;
    if (application.search('msword') !== -1) return <FaFileWordO className="upb__itembox__icon upb__itembox__icon__word"></FaFileWordO>;
    if (application.search('wordprocessingml') !== -1) return <FaFileWordO className="upb__itembox__icon upb__itembox__icon__word"></FaFileWordO>;
    return <FaFileO className="upb__itembox__icon"/>;
  }
  render(){
    const divStyle = {
      color: (this.props.color === undefined) ? 'inherit' : this.props.color,
      display: 'inline-block'
    }
    return <div style={divStyle}>{this.setIcon()}</div>
  }
}

IconFile.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.string
};

module.exports = IconFile;
