# @fusionworks/ra-s3-input
It's an input file for [react-admin](https://github.com/marmelab/react-admin) that uploads files on S3.
This component is an wrapper for [react-s3-uploader](https://github.com/odysseyscience/react-s3-uploader) and uses [react-image-lightbox](https://github.com/frontend-collective/react-image-lightbox) for image galleries.

## Install

`` npm install @fusionworks/ra-s3-input ``

## Props

#### S3FileInput

|Prop|Type|Description|Default|
|:---:|:---:|:---:|:---:|
|source|**string**| source field in resource object|
|apiRoot|**string**|path to api server |
|fileCoverImg|**string**|source field in your resource model|
|uploadOptions|**object**| options that will be passed to s3Input component (same options as [props for react-s3-uploader](https://github.com/odysseyscience/react-s3-uploader)) |
|multipleFiles|**boolean**|allows to upload multiple files|**false**|

#### S3FileFolder

|Prop|Type|Description|
|:---:|:---:|:---:|
|source|**string**| source field in resource object|
|apiRoot|**string**|path to api server |


## Usage

Using in Create/Edit form is similar :

``` jsx
import { Edit, SimpleForm, TextInput } from 'react-admin';
// import S3FileInput component
import { S3FileInput } from '@fusionworks/ra-s3-input';

export const EntityEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source='id' />
      <TextInput source='name' />
        <S3FileInput
          source='photo'
          apiRoot='localhost:3000/' // your api server
          fileCoverImg="someImgURL" // cover img for non-img files
          multipleFiles // allaw to save multiple files for that source
          uploadOptions={{
            signingUrl: 'localhost:3000/s3/sign', // api point to your server for S3 signin,
            s3path: 'yourS3FolderOnBucket/subFolderId', // path to folder from S3 where wil be saved file
            multiple: true, // for selecting multiple files from file system
          }}
        />
    </SimpleForm>
  </Edit>
);
```
And There is a component for simple showing Files, without the ability to add/delete files:

```jsx

import { Show, SimpleShowLayout, TextField } from 'react-admin';
// import S3FileField
import { S3FileField } from '@fusionworks/ra-s3-input';

// use S3FileField component in show View
export const ShowEntity = props => (
  <Show {...props}>
    <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <S3FileField
          apiRoot='localhost:3000/' // your api server
          source="photos"
        />
    </SimpleShowLayout>
  </Show>
);
```
Also there is some required handling for ```/signIn``` route and for file get requests.

This is how it is done on a backend server that uses [nestJs](https://github.com/nestjs/nest) :

```ts

// s3.controller
import { Controller, Get, Req, Res, Param } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private s3service: S3Service) {}

  @Get('/sign')
  sign(@Req() req, @Res() res) {
    return this.s3service.signIn(req, res);
  }

  @Get('/uploads/yourS3FolderOnBucket/subFolderId/:key')
  fileRedirect(@Param('caseId') caseId: string, @Param('key') key: string, @Res() res) {
    return this.s3service.tempRedirect(caseId, key, res);
  }
}
```

```ts
// s3.service
import { Injectable } from '@nestjs/common';
import { InjectConfig, ConfigService } from 'nestjs-config';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3Bucket: string;
  private readonly s3Region: string;
  private s3: S3;

  constructor( @InjectConfig() private config: ConfigService ) {
    this.s3Bucket = config.get('s3.bucket'); // your s3 bucket name
    this.s3Region = config.get('s3.region'); // your s3 Bucket region
    this.s3 = new S3({ region: this.s3Region, signatureVersion: 'v4' });
  }

  async signIn(req, res): Promise<any> {
    const { objectName, contentType, path } = req.query;
    const objectNameChunks = objectName.split('/');
    const filename = objectNameChunks[objectNameChunks.length - 1];
    const mimeType = contentType;
    const fileKey = `${path || ''}/${objectName}`;
    const params = {
      Bucket: this.s3Bucket,
      Key: fileKey,
      Expires: 60,
      ContentType: mimeType,
      ACL: 'private',
    };

    res.set({ 'Access-Control-Allow-Origin': '*' });
    this.s3.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        return res.status(500, 'Cannot create S3 signed URL');
      }

      res.json({
        signedUrl: data,
        publicUrl: '/s3/uploads/' + fileKey,
        filename,
        fileKey,
      });
    });
  }

  tempRedirect(subFolder: string, key: string, res) {
    const params = {
      Bucket: this.s3Bucket,
      Key: `yourS3FolderOnBucket/${subFolder}/${key}`,
    };
    this.s3.getSignedUrl('getObject', params, (err, url) => {
      res.redirect(url);
    });
  }

}
```

**Note** you need to use aws-sdk module on back-end
