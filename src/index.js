import React, { Component } from 'react';
import { addField } from 'ra-core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FileList from './FileList';
import Loading from './Loading';
import AddFileBtn from './AddFileBtn';
import DownloadAllBtn from './DownloadAllBtn';
import 'react-image-lightbox/style.css';

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.uploadInput = React.createRef();

    this.state = {
      fileList: [],
      btnLabel: '',
      loading: false,
      percent: 0
    }
  }

  componentDidMount() {
    this.setState({
      fileList: this.getFilesFromProps(),
    });
  }

  getFilesFromProps() {
    const { input, record } = this.props;

    if (input) {
      return input.value || [];
    }

    if (record) {
      return record[this.props.source] || [];
    }

    return [];
  }

  deleteFile(fileName) {
    const newFileList = this.state.fileList.filter(file => file.name !== fileName);
    this.props.input.onChange(newFileList);
    this.setState({ fileList: newFileList });
  }

  getFileList() { return this.state.fileList; }

  onFinishFileUpload(result) {
    const newFile = { name: result.filename, url: result.fileKey };
    let newFileList;

    if (this.props.multipleFiles) {
      newFileList = [...this.getFileList(), newFile];
    } else {
      newFileList = [ newFile ];
    }

    this.setState({ fileList: newFileList });
    this.props.input.onChange(newFileList);
  }

  onFileProgress(percentage) {
    if (percentage === 0) {
      return this.setState({ loading: true })
    }
    if (percentage === 100) {
      return this.setState({ loading: false })
    }
    this.setState({ percent: percentage })
  }

  render() {
    const { classes, disabled, uploadOptions, apiRoot, fileCoverImg } = this.props;
    const { fileList, loading, percent } = this.state;

    const s3InputOptions = {
      signingUrlMethod: "GET",
      accept: "*/*",
      onFinish: this.onFinishFileUpload.bind(this),
      onProgress: this.onFileProgress.bind(this),
      uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
      signingUrlWithCredentials: false,
      signingUrlQueryParams: { uploadType: 'avatar' },
      autoUpload: true,
      className: classes.fileInput,
      id: 'filesInput',
      ref: this.uploadInput,
      ...uploadOptions,
    }


    return (
      <div className={classes.wrapper}>
        {!disabled &&
          <AddFileBtn
            label='Add File'
            uploadOptions={s3InputOptions}
            classes={classes}
          />
        }
        <FileList
          apiRoot={apiRoot}
          fileCoverImg={fileCoverImg}
          files={fileList}
          deleteFile={this.deleteFile.bind(this)}
          classes={classes}
          disabled={disabled}
        />
        {loading &&
          <Loading percentage={percent} classes={classes} />
        }
      </div>
    );
  }
}

const StyledFileUploader = withStyles(styles)(FileUploader);

export const S3FileInput = addField(StyledFileUploader);
export const S3FileField = props => <StyledFileUploader {...props} disabled/>;