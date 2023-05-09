import React from "react";
import "./menu.styl";
import {
  TiHomeOutline,
  TiChevronRightOutline,
  TiDownloadOutline,
  TiUploadOutline,
} from "react-icons/ti";
//import TiChevronRightOutline from 'react-icons/lib/ti/chevron-right-outline'
//import TiDownloadOutline from 'react-icons/lib/ti/download-outline'
//import TiUploadOutline from 'react-icons/lib/ti/upload-outline'
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
//import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class MenuItem extends React.Component {
  handleClick(event) {
    this.props.onClick(this.props.data);
  }
  render() {
    let classUpItem = this.props.position == 0 ? null : "upb__menu__item__up";
    return (
      <div
        className={"upb__menu__item " + classUpItem}
        onClick={this.handleClick.bind(this)}
      >
        {this.props.data.name}
      </div>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.directoryHome = this.props.directories.find(
      (directory) => directory.id === 0
    );
  }
  handleClick(event) {
    this.props.onClick(this.directoryHome);
  }
  setDirectories() {
    if (this.props.settings.changeDirectory != undefined)
      this.props.settings.changeDirectory(this.props.directory);

    let arrDirectories = [];
    let parentId = this.props.directory.id;
    let index = 0;
    while (parentId !== 0) {
      let itemDirectory = this.props.directories.find(
        (directory) => directory.id == parentId
      );
      parentId = itemDirectory.parentId;
      arrDirectories.push(
        <MenuItem
          key={index.toString()}
          position={index}
          data={itemDirectory}
          onClick={this.props.onClick}
        ></MenuItem>
      );
      index++;
      arrDirectories.push(<TiChevronRightOutline key={index.toString()} />);
      index++;
    }
    arrDirectories.push(
      this.props.iconHome == false ? (
        <MenuItem
          key={index.toString()}
          position={index}
          data={this.directoryHome}
          onClick={this.props.onClick}
        ></MenuItem>
      ) : (
        <TiHomeOutline
          key={index.toString()}
          onClick={this.handleClick.bind(this)}
          className="upb__itemHome"
        />
      )
    );
    return arrDirectories.reverse();
  }

  handleClickDownload(e) {
    e.preventDefault();
    window.open(this.props.directory.urlButtonDownload, "_blank");
  }

  render() {
    const labelUploadFile =
      this.props.settings.caption.labelUploadFile === undefined
        ? "Upload file"
        : this.props.settings.caption.labelUploadFile;

    const labelDownload =
      this.props.settings.caption.labelDownload === undefined
        ? "Download zip"
        : this.props.settings.caption.labelDownload;

    const buttonUpload =
      this.props.settings.buttonUpload === true &&
      this.props.directory.drag === true ? (
        <div title={labelUploadFile} onClick={this.props.onClickUpload}>
          <span className={"upb__menu__button__item"}>
            <TiUploadOutline></TiUploadOutline>
          </span>
        </div>
      ) : null;

    const buttonDownload =
      this.props.directory.buttonDownload === true ? (
        <div
          title={labelDownload}
          className={" "}
          onClick={this.handleClickDownload.bind(this)}
        >
          <span className={"upb__menu__button__item"}>
            <TiDownloadOutline></TiDownloadOutline>
          </span>
        </div>
      ) : null;

    return (
      <div className="upb__menuBox">
        <div className={"upb__path__directory"}>{this.setDirectories()}</div>
        <div className={"upb__menu__button"}>{buttonUpload}</div>
        <div className={"upb__menu__button"}>
          <ButtonGroup>{buttonDownload}</ButtonGroup>
        </div>
      </div>
    );
  }
}

export default Menu;
