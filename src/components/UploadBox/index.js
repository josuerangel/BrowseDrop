import React from 'react'
import Menu from '../menu/menu'
import Box from '../box/box'
import File from '../file/File'
import Directory from '../Directory'
import 'whatwg-fetch'
import './uploadbox.styl'

class UploadBox extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            txt: 'this is the initial state txt',
            items: []
        }
    }
    componentDidMount() {
        this.arrDirectorys = this.props.options.Data.filter(function(item) {
            if (item.url === undefined)
                return item;
            });
        this.setState({
            items: (this.props.options.Data !== undefined) ? this.props.options.Data : []
        });
    }
    update(e) {
        this.setState({txt: e.target.value})
    }
    selectedMenu(dir){

    }
    addFile(fileList, dir) {
        console.log('addFile');
        console.log(fileList);
        this.setState({txt: 'add file ' + fileList[0].name + ' en ' + dir.name});
        let inputFile = document.querySelector("#upbInputFile");
        var formData = new FormData();
        for(var x = 0, len = fileList.length; x < len; x++){
            formData.append('file' + x, fileList[x]);
        }
        fetch('/avatars', {
            method: 'POST',
            body: formData
        });
    }
    handleDragEnter(dir){
        this.setState({txt: 'drag file into' + dir.name});
    }
    handleClickDirectory(directory){
        this.setState({
            id: directory.id,
            items: this.props.options.Data.filter((item) => (item.parentId === directory.id))
        });
    }
    handleClickMenu(menu){
        this.setState({
            id: menu.id,
            items: this.props.options.Data.filter((item) => (item.parentId === menu.id))
        })
    }
    setItemList() {
        return this.state.items.map((item) => (item.urlDownload !== undefined)
            ? <File data={item}/>
            : <Directory data={item} addFile={this.addFile.bind(this)}
              onDragEnter={this.handleDragEnter.bind(this)}
              onClick={this.handleClickDirectory.bind(this)} />);
    }
    render() {
        let txt = this.props.txt
        let num = this.props.numero
        //let itemList = this.setItemList();
        return (
            <div className="upb_container">
                <h1>{txt}</h1>
                <input type="text" onChange={this.update.bind(this)}/>
                <h1>{this.state.txt}</h1>
                <h1>{this.state.id}</h1>
                <Menu id={this.state.id} directorys={this.arrDirectorys}
                    onClick={this.handleClickMenu.bind(this)} ></Menu>
                <Box data={this.state.items}
                    onClickDirectory={this.handleClickDirectory.bind(this)} ></Box>
            </div>
        )
    }
}

UploadBox.propTypes = {
    txt: React.PropTypes.string,
    options: React.PropTypes.object,
    dataFilesAndDirs: React.PropTypes.array
}

UploadBox.defaultProps = {
    txt: "Default TXT prop",
    option: {},
    dataFilesAndDirs: []
}

module.exports = UploadBox;
