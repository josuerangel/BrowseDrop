import React from 'react'
import PropTypes from 'prop-types'
import './file.styl'
import deepmerge from 'deepmerge'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import IconFile from '../icon-file/icon-file.js'
import TiDownloadOutline from 'react-icons/lib/ti/download-outline'

class File extends React.Component {
  caption : {}
  constructor(props){
    super(props);
    let defaultCaption = {
      deleteFileTitle: "Delete file",
      deleteFileBody: "Are you sure you want to remove this file?",
      btnDeleteFileClose: "Close",
      btnDeleteFileSave: "Delete",
      tooltipButtonDelete: 'Delete file',
      tooltipButtonDownload: 'Download compress file'
    }
    let userCaption = (this.props.caption !== undefined) ? this.props.caption : {};
    this.caption = deepmerge.all([{}, defaultCaption, userCaption]);

    this.state = {
      isOver: false,
      showModal: false
    }
  }
  onClick(event){
    if (this.props.data.type === "directory") {
      event.preventDefault();
      this.props.onClick(this.props.data);
    }
    else {
      event.preventDefault();
      window.open(this.props.data.url, "_new");
    }
  }
  setAnimation(){
    if(this.props.data.animationIn === undefined) return ""
    else return this.props.data.animationIn
  }
  setHiddenButtonDelete(){
    if (this.props.data.buttonDownloadAutoHide === false) return "";

    if (this.state.isOver) return "";
    else return "upb__itembox__btnDelete__container__hidden";
  }
  handleMouseEnter(e){
    e.stopPropagation();
    //if (this.props.data.type !== "directory")
      this.setState({ isOver: true})
  }
  handleMouseLeave(e){
    e.stopPropagation();
    //if (this.props.data.type !== "directory")
      this.setState({ isOver: false})
  }
  handleClickTrash(e){
    e.preventDefault();
    this.setState({ showModal:true });
  }
  handleClickDownload(e){
    e.preventDefault();
    window.open(this.props.data.urlButtonDownload, '_blank');
  }
  closeModal(){
    this.setState({ showModal: false });
  }
  sendDeleteFile(e){
    this.props.onDeleteFile(this.props.data);
    this.setState({ showModal: false });
  }
  setDisabled(){
    if (this.props.data.noAction === true)
      return "upb__itembox__disabled";
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

    const buttonTrash = (this.props.data.type !== "directory" && this.props.data.buttonDelete !== false) ?
      (<div title={this.caption.tooltipButtonDelete} className={"upb__itembox__btnDelete__container " + this.setHiddenButtonDelete()}
        onClick={this.handleClickTrash.bind(this) }>
          <Glyphicon glyph="trash" className={"upb__itembox__btnDelete"} />
      </div>) : null;

    const buttonDownload = (this.props.data.type === "directory" && this.props.data.buttonDownload === true) ?
      (<div title={this.caption.tooltipButtonDownload} className={"upb__itembox__btnDelete__container " + this.setHiddenButtonDelete()}
        onClick={this.handleClickDownload.bind(this) }>
          <span className="upb__itembox__btnDownload">
            <TiDownloadOutline></TiDownloadOutline>
          </span>
      </div>) : null;

    return <div className={"upb__itembox animated " + this.setAnimation() + this.setDisabled()}
      onMouseEnter={this.handleMouseEnter.bind(this)}
      onMouseLeave={this.handleMouseLeave.bind(this)}>
      <div className="upb__itembox__iconName">
        <IconFile name={this.props.data.name} type={this.props.data.type} color={'#48A0DC'}></IconFile>
        <a className="upb__itembox__name" href={this.props.data.url}
          onClick={this.onClick.bind(this)}>{this.props.data.name}</a>
      </div>
      <div className="">
        {this.props.data.date}
      </div>
      {buttonTrash}
      {buttonDownload}
      {modalInstance}
    </div>
  }
};

File.propTypes = {
  caption: PropTypes.object,
  data: PropTypes.object,
  onClick: PropTypes.func
};

module.exports = File
