import React, { useState, useEffect } from 'react';
import { Card, Alert, Upload, Image, Divider, Button, message } from 'antd';
import { getUploadedImages } from '../../utils/apis';
import * as constants from '../../utils/constants';
import * as siteConfig from '../../config';
import { NavLink } from 'react-router-dom';

import { UploadOutlined } from '@ant-design/icons';

const removeTrailingSlash = (url) => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

const baseURl = removeTrailingSlash(siteConfig.default.apiURL);

const Home = () => {

  const [reload, setReload] = useState(0);
  const [images, setImages]  = useState([])

  useEffect(() => {
    const getImages = async () => {
      const res = await getUploadedImages()
      setImages(res?.data || []);
    }
    getImages()
  }, [reload])

  const onChange = (info) => {
    if (info.file.status === 'done') {
      message.info('upload successful')
      setReload(reload + 1)
    }else if (info.file.status === 'error') {
      message.error('Failed to upload image');
    }
  };

  return (
    <Card>
      <h2>
        Image Gallary
        <Upload
          action={`${baseURl}/api/v1/upload-image`}
          className='float-right'
          multiple
          onChange={onChange}
          headers={{
           'Authorization': 'Token ' + localStorage.getItem(constants.authToken),
          }}>
          <Button
            className='float-right btn-info'
            icon={<UploadOutlined />}>Upload Images</Button>
        </Upload>
      </h2>
      <Divider style={{ marginTop: '5px'}}/>

      {images.length ? 
        <>
          {images.map((image, index) => {
            return (
              <NavLink key={index} to={`/annotate/${image.id}`}>
                <Image
                  width={250}
                  height={180}
                  style={{
                    paddingRight: '20px',
                    paddingBottom: '20px',
                    cursor: 'pointer'
                  }}
                  preview={false}
                  src={`${baseURl}${image.image}`}
                  />
              </NavLink>
            )
          })}
        </>
      : 
        <Alert
          type='info'
          message="No images found."
          showIcon
          description="Please upload images using the upload button to annotate."/>
      }
    </Card>

  )
}

export default Home;  