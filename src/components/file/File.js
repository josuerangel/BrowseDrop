import React from 'react'
import ReactDOM from 'react-dom'
import './file.styl'
import deepmerge from 'deepmerge'
import FaFileO from 'react-icons/lib/fa/file-o'
import FaFolderOpen from 'react-icons/lib/fa/folder-open'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaFileImageO from 'react-icons/lib/fa/file-image-o'
import FaFileArchiveO from 'react-icons/lib/fa/file-archive-o'
//import FaFileO from 'react-icons/lib/fa/file-o'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Row from 'react-bootstrap/lib/Row'
//import mimedb from 'mime-db'
//var mime = require('mime-types')
import mime from 'mime-types'

class File extends React.Component {
  caption : {}
  //arrExtensions : []
  constructor(props){
    super(props);
    //arrExtensions = [];
    let defaultCaption = {
      deleteFileTitle: "Delete file",
      deleteFileBody: "Are you sure you want to remove this file?",
      btnDeleteFileClose: "Close",
      btnDeleteFileSave: "Delete"
    }
    if (this.props.caption !== undefined) {
      this.caption = deepmerge.all([{}, defaultCaption, this.props.caption]);
    }
    console.log(this.caption);
    this.state = {
      isOver: false,
      showModal: false
    }
  }
  setIcon(item){
    console.log('setIcon: ', item);
    console.log(mime.lookup(item.name));
    return (item.type === "directory")
      ? <FaFolderOpen className="upb__itembox__icon" />
    : this.setIconFile(item.name);
    //: <FaFileO className="upb__itembox__icon"/>;
  }
  setIconFile(name){
    const arrType = mime.lookup(name).split("/");
    console.log(arrType);
    let result = null;
    switch (arrType[0]) {
      case 'image':
        result = <FaFileImageO className="upb__itembox__icon"></FaFileImageO>;
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
    let result = null;
      switch (application) {
        case 'x-rar-compressed':
          result = <FaFileArchiveO className="upb__itembox__icon"></FaFileArchiveO>;
          break;
        default:
            result = <FaFileO className="upb__itembox__icon"/>;
      }
      return result;
  }
  onClick(event){
    if (this.props.data.type === "directory")
      this.props.onClick(this.props.data);
    else
      window.open(this.props.data.url, "_new");
  }
  setAnimation(){
    if(this.props.data.animationIn === undefined) return ""
    else return this.props.data.animationIn
  }
  setHiddenButtonDelete(){
    if (this.state.isOver) return "";
    else return "upb__itembox__btnDelete__container__hidden";
  }
  handleMouseEnter(e){
    e.stopPropagation();
    if (this.props.data.type !== "directory")
      this.setState({ isOver: true})
  }
  handleMouseLeave(e){
    e.stopPropagation();
    if (this.props.data.type !== "directory")
      this.setState({ isOver: false})
  }
  handleClickTrash(e){
    e.preventDefault();
    console.log('handleClickTrash: ', e);
    this.setState({ showModal:true });
  }
  closeModal(){
    this.setState({ showModal: false });
  }
  sendDeleteFile(e){
    console.log(e);
    console.log(this.props);
    this.props.onDeleteFile(this.props.data);
    // CoreDeleteFile(this.props.data, this.props.directoryHome, this.props.settings, function(data){
    //   console.log('termina delete', data);
    // });
  }
  render () {
    let modalInstance = null;
    if (this.caption !== undefined){
    modalInstance = (
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header>
            <Modal.Title>{this.caption.deleteFileTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.caption.deleteFileBody}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>{this.caption.btnDeleteFileClose}</Button>
            <Button bsStyle="primary" onClick={this.sendDeleteFile.bind(this)}>{this.caption.btnDeleteFileSave}</Button>
          </Modal.Footer>
        </Modal>
    );
    }
    const buttonTrash = (this.props.data.type !== "directory") ?
      (<div className={"upb__itembox__btnDelete__container " + this.setHiddenButtonDelete()}
        onClick={this.handleClickTrash.bind(this) }>
          <Glyphicon glyph="trash" className={"upb__itembox__btnDelete"} />
      </div>) : null;

    return <div className={"upb__itembox animated " + this.setAnimation()}
      onMouseEnter={this.handleMouseEnter.bind(this)}
      onMouseLeave={this.handleMouseLeave.bind(this)}>
      <div className="upb__itembox__iconName">
        {this.setIcon(this.props.data)}
        <a className="upb__itembox__name" href={this.props.data.url}
          onClick={this.onClick.bind(this)}>{this.props.data.name}</a>
      </div>
      <div className="">
        {this.props.data.date}
      </div>
      {buttonTrash}
      {modalInstance}
    </div>
  }
};

File.propTypes = {
  data: React.PropTypes.object,
  onClick: React.PropTypes.func
};

module.exports = File
