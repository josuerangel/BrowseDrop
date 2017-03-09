/*jshint esversion: 6 */
import React from 'react';
import './menu.styl';

class MenuItem extends React.Component {
  handleClick(event){
    console.log(this.props);
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
  setDirectorys(){
    let arrDirectorys = [];
    let parentId = this.props.id;
    while (parentId !== 0){
      let itemDirectory = this.props.directorys.find((directory) => directory.id == parentId);
      parentId = itemDirectory.parentId;
      arrDirectorys.push(<MenuItem data={itemDirectory} onClick={this.props.onClick}></MenuItem>);
    }
    let home = {
      "id":0,
      "parentId":0,
      "name":"home",
      "drag":true,
      "extraDataRequest":{
         "smeId":"3083765",
         "subscriptionId":"3084090",
         "actId":"3",
         "lng":"sp",
         "categoryFileId":1,
         "categoryProposalId":1
      }
    };
    arrDirectorys.push(<MenuItem data={home} onClick={this.props.onClick}></MenuItem>);
    return arrDirectorys.reverse();
  }
  render(){
    //let items = this.setDirectorys();
    return <div>{this.setDirectorys()}</div>
  }
}

module.exports = Menu;
