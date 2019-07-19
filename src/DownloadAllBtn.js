import React from 'react';
import Button from '@material-ui/core/Button';

const DownloadAllBtn = ({ serverUrl, folderPath, classes }) => (
  <a href={`${serverUrl}/ ${folderPath}/zip`}>
    <Button
      className={classes.zippedFiles}
      color='primary'
    >
      Download All
    </Button>
  </a>
);

export default DownloadAllBtn;