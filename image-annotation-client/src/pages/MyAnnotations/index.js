import React, { useState, useEffect } from 'react';
import { Card, Divider, Alert, Image } from 'antd';
import { getUserAnnotationsAPI } from '../../utils/apis';
import { NavLink } from 'react-router-dom';
import * as siteConfig from '../../config';

const removeTrailingSlash = (url) => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

const baseURl = removeTrailingSlash(siteConfig.default.apiURL);

const MyAnnotations = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    const getAnnotatedImages =  async () => {
      const res = await getUserAnnotationsAPI();
      if (res.data){
        setImages(res.data)
      }
    }

    getAnnotatedImages();
  }, [])  

  return (
    <Card>
      <h2>My Annotations</h2>
      <Divider style={{ marginTop: '5px'}}/>
      {images.length < 1 ?
        <Alert
          type='info'
          message="No Images found"
          showIcon
          description="You haven't annotated any images, please select an image from image gallery and add annotation(s)"/>
      : 
      <>
      {images.map((image, index) => {
        return (
          <NavLink key={index} to={`/annotate/${image.image.id}`}>
            <Image
              width={250}
              height={180}
              style={{
                paddingRight: '20px',
                paddingBottom: '20px',
                cursor: 'pointer'
              }}
              preview={false}
              src={`${baseURl}${image.image.image}`}
              />
          </NavLink>
        )
      })}
    </>
      }
    </Card>
  )
}

export default MyAnnotations;