import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import FileItem from './FileItem';

class FileList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gallery: false,
      galleryImg: false,
    }
  }
  
  showBiggerImg(url) {
    this.setState({
      gallery: !this.state.gallery,
      galleryImg: url,
    });
  }

  render() {
    const { files, deleteFile, disabled, classes, apiRoot, fileCoverImg } = this.props;
    const { gallery, galleryImg } = this.state;

    return (files.length > 0) ?
    <>
      <ul className={classes.addedFiles}>
        {files.map((file, i) =>
          <li key={i} className={classes.fileItem}>
            <FileItem
              apiRoot={apiRoot}
              file={file}
              fileCoverImg={fileCoverImg}
              showBiggerImg={this.showBiggerImg.bind(this)}
              classes={classes}
              disabled={disabled}
              deleteFile={deleteFile}
            />
          </li>
        )}
      </ul>
      {gallery && (
        <Lightbox
          mainSrc={galleryImg}
          onCloseRequest={() => this.setState({ gallery: false })}
        />
      )}
    </> :
    <div className={classes.empty}> No Files</div>
  }
  
}

export default FileList;