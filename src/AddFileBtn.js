import React from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import Button from '@material-ui/core/Button';

const AddFileBtn = ({ classes, label, uploadOptions }) => (
  <>
    <Button
      className={classes.labelFileInput}
      color='primary'
    >
      <label
        htmlFor="filesInput"
        style={{ padding: '3px 10px', display: 'inline-block' }}
      >
        {label}
      </label>
    </Button>
    <ReactS3Uploader {...uploadOptions} />
  </>
);

export default AddFileBtn;