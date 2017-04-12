import React from 'react'
import ReactDOM from 'react-dom'
import './file.styl'
import deepmerge from 'deepmerge'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import IconFile from '../icon-file/icon-file.js'

class File extends React.Component {
  caption : {}
  constructor(props){
    super(props);
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
    this.setState({ showModal: false });
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
        <IconFile name={this.props.data.name} type={this.props.data.type} color={'#48A0DC'}></IconFile>
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
