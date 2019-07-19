import React from 'react';
import Button from '@material-ui/core/Button';
// import fileImg from './img/file.png';
import { isImage } from './utils';

const FileItem = ({
  file,
  apiRoot,
  showBiggerImg,
  classes,
  disabled,
  deleteFile,
  fileCoverImg,
}) => {
  console.log('fileinput -> fileList -> fileItem ->',fileCoverImg);

  const serverUrl = `${apiRoot}/s3/uploads/${file.url}`;
  const isImg = isImage(serverUrl);
  const backgroundImg = isImg ? serverUrl : fileCoverImg;

  const handleClickImg = () => {
    if (isImg) {
      showBiggerImg(serverUrl);
    }
  }

  return (
    <>
      <div className={classes.fileLink}>
        <div
          className={classes.fileImg}
          onClick={() => handleClickImg()}
          style={{ 'backgroundImage': `url(${backgroundImg})` }}>
        </div>
        <div className={classes.fileName}>{file.name}</div>
      </div>

      <div className={classes.rightBlock}>
        <a
          href={serverUrl}
          target='_blank'
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Button className={classes.download}>
            <span>Download</span>
          </Button>
        </a>

        {!disabled &&
          <Button
            className={classes.delete}
            onClick={() => deleteFile(file.name)}
          >
            <span>Delete</span>
          </Button>
        }
      </div>
    </>
  )
};

export default FileItem;