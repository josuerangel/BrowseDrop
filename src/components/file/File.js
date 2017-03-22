import React from 'react'
import './file.styl'
import { FaFolderOpen, FaFileO } from 'react-icons/lib/fa'
//import FaFileO from 'react-icons/lib/fa/file-o'

class File extends React.Component {
  setIcon(item){
    return (item.type === "directory")
      ? <FaFolderOpen className="upb__itembox__icon" />
      : <FaFileO className="upb__itembox__icon"/>;
  }
  onClick(event){
    this.props.onClick(this.props.data);
  }
  setAnimation(){
    if(this.props.data.animationIn === undefined) return ""
    else return this.props.data.animationIn
  }
  render () {
    return <div className={"upb__itembox animated " + this.setAnimation()}>
      <div className="upb__itembox__iconName">
        {this.setIcon(this.props.data)}
        <a className="upb__itembox__name" href={this.props.data.urlDownload}
          onClick={this.onClick.bind(this)}>{this.props.data.name}</a>
      </div>
      <div className="">
        {this.props.data.date}
      </div>
    </div>
  }
};

File.propTypes = {
  data: React.PropTypes.object,
  onClick: React.PropTypes.func
};

module.exports = File
