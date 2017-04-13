import React from 'react';
import './menu.styl';
import TiHomeOutline from 'react-icons/lib/ti/home-outline'
import TiChevronRightOutline from 'react-icons/lib/ti/chevron-right-outline'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class MenuItem extends React.Component {
  handleClick(event){
    this.props.onClick(this.props.data)
  }
    render() {
      return <div className="upb__menu__item" onClick={this.handleClick.bind(this)}> { this.props.data.name } </div>
  }
}

MenuItem.propTypes = {
    text: React.PropTypes.string
}

MenuItem.defaultProps = {
    text: "Home"
}

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.directoryHome = this.props.directorys.find((directory) => directory.id === 0)
  }
  // componentDidMount(){
  //   if(this.props.directorys !== undefined)
  //     this.directoryHome = this.props.directorys.find((directory) => directory.id === 0)
  // }
  handleClick(event){
    this.props.onClick(this.directoryHome);
  }
  setDirectorys(){
    let arrDirectorys = [];
    let parentId = this.props.directory.id;
    let index = 0;
    while (parentId !== 0){
      let itemDirectory = this.props.directorys.find((directory) => directory.id == parentId);
      parentId = itemDirectory.parentId;
      arrDirectorys.push(<MenuItem key={index.toString()} data={itemDirectory} onClick={this.props.onClick}></MenuItem>);
      index++;
      arrDirectorys.push(<TiChevronRightOutline key={index.toString()} />)
      index++;
    }
    arrDirectorys.push((this.props.iconHome == false)
      ? <MenuItem key={index.toString()} data={this.directoryHome} onClick={this.props.onClick}></MenuItem>
      : <TiHomeOutline key={index.toString()} onClick={this.handleClick.bind(this)}
       className="upb__itemHome" />);
    return arrDirectorys.reverse();
  }
  render(){
    const labelUploadFile = (this.props.settings.caption.labelUploadFile === undefined)
      ? 'Upload file'
      : this.props.settings.caption.labelUploadFile;
    const buttonUpload = (this.props.settings.buttonUpload === false)
      ? null
      : (<Button bsStyle="primary" onClick={this.props.onClickUpload}>
        <Glyphicon glyph="upload" />
        <span className={"upb__menu__button__label"}>{labelUploadFile}</span>
      </Button>);
    return <div className="upb__menuBox">
      <div>{this.setDirectorys()}</div>
      <div className={"upb__menu__button"}>
        {buttonUpload}
      </div>
      </div>
  }
}

module.exports = Menu;
