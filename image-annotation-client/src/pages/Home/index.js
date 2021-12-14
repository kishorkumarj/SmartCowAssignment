import React, { useState, useEffect } from 'react';
import { Card, Alert, Upload, Image, Divider, Button } from 'antd';
import { getUploadedImages } from '../../utils/apis';
import * as constants from '../../utils/constants';
import * as siteConfig from '../../config';
import { NavLink } from 'react-router-dom';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const removeTrailingSlash = (url) => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

const baseURl = removeTrailingSlash(siteConfig.default.apiURL);

const Home = () => {

  const [fileList, setFileList] = useState([]);
  const [images, setImages]  = useState([])

  useEffect(() => {
    const getImages = async () => {
      const res = await getUploadedImages()
      setImages(res?.data || []);
    }
    getImages()
  }, [])

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onChange = ({ file }) => {
    //setFileList(newFileList);
  };

  return (
    <Card>
      <h2>
        Image Gallary
        <Button
          className='float-right btn-info'
          icon={<UploadOutlined />}>Upload Images</Button>
      </h2>
      <Upload
         action={`${baseURl}/api/v1/upload-image`}
         headers={{
          'Authorization': 'Token ' + localStorage.getItem(constants.authToken),
        }}
         listType="picture-card"
         //fileList={fileList}
         onChange={onChange}>
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

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