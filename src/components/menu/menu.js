import React from 'react';
import './menu.styl';
import { TiHome, TiHomeOutline, TiChevronRightOutline } from 'react-icons/lib/ti'

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
  }
  componentDidMount(){
    if(this.props.directorys !== undefined)
      this.directoryHome = this.props.directorys.find((directory) => directory.id === 0)
  }
  handleClick(event){
    let home = {
      "id":0,
      "parentId":0,
      "name":"Home",
      "drag":true
    };
    this.props.onClick(home);
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

    let home = {
      "id":0,
      "parentId":0,
      "name":"Home",
      "drag":true
    };
    arrDirectorys.push((this.props.iconHome == false)
      ? <MenuItem key={index.toString()} data={home} onClick={this.props.onClick}></MenuItem>
      : <TiHomeOutline key={index.toString()} onClick={this.handleClick.bind(this)}
       className="upb__itemHome" />);
    return arrDirectorys.reverse();
  }
  render(){
    return <div className="upb__menuBox">{this.setDirectorys()}</div>
  }
}

module.exports = Menu;
