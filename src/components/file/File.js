import React from 'react'
import classNames from 'classnames'
import './file.styl'

class File extends React.Component {
  setUrlIcon(item){
    if (item.url !== undefined)
      return './bundles/assets/images/file-empty.svg'
    else
      return './bundles/assets/images/folder.svg'
  }
  onClick(event){
    this.props.onClick(this.props.data);
  }
  render () {
    let classLink = classNames({

    });
    return <div className="upb__itembox">
      <div className="upb__itembox__iconName">

        <img src={this.setUrlIcon(this.props.data)}
          className='upb__itemList-verticalAlign upb__itembox__icon upb__file-margin' />
        <a className="upb__itembox__name" href={this.props.data.urlDownload}
          onClick={this.onClick.bind(this)}>{this.props.data.name}</a>
      </div>
      <div className="">
        {this.props.data.date}
      </div>
    </div>
  }
};

module.exports = File
