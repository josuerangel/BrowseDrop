import React from 'react';
import File from '../file/File';
import Directory from '../Directory'
//import $ from 'jquery'

class UploadBox extends React.Component {
    constructor() {
        super();
        this.state = {
            txt: 'this is the initial state txt',
            items: []
        }
    }
    componentDidMount() {
        this.setState({items: this.props.dataFilesAndDirs});
    }
    update(e) {
        this.setState({txt: e.target.value})
    }
    addFile(fileList, dir) {
        console.log('addFile');
        console.log(fileList);
        this.setState({txt: 'add file ' + fileList[0].name + ' en ' + dir.name});
    }
    setItemList() {
        return this.state.items.map((item) => (item.urlDownload !== undefined)
            ? <File data={item}/>
            : <Directory data={item} addFile={this.addFile.bind(this)}/>);
    }
    render() {
        let txt = this.props.txt
        let num = this.props.numero
        let itemList = this.setItemList();
        return (
            <div>
                <h1>{txt}</h1>
                <input type="text" onChange={this.update.bind(this)}/>
                <h1>{this.state.txt}</h1>
                <ul>{itemList}</ul>
            </div>
        )
    }
}

UploadBox.propTypes = {
    txt: React.PropTypes.string,
    dataFilesAndDirs: React.PropTypes.array
}

UploadBox.defaultProps = {
    txt: "Default TXT prop",
    dataFilesAndDirs: []
}

module.exports = UploadBox;
