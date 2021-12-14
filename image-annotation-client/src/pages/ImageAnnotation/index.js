import React, { useState,  useEffect } from 'react';
import { Card, Alert, Divider, Spin, Button, notification } from 'antd';
import { useParams } from 'react-router-dom';
import Annotatoin from 'react-image-annotation';
import { getImageAnnotationAPI, saveImageAnnotationAPI, resetAnnotationsAPI } from '../../utils/apis';
import * as siteConfig from '.././../config';

const removeTrailingSlash = (url) => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

const baseURl = removeTrailingSlash(siteConfig.default.apiURL);

const ImageAnnotation = () => {
  
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [annotations, setAnnotations] = useState([])
  const [annotation, setAnnotation] = useState({})
  const [imageDetails, setImageDetails] = useState({id: '', image: '', user: ''})

  const { imageId } = useParams('imageId');
  
  useEffect(() => {
    const getImageAnnotation = async () => {
      setLoading(true)
      const res = await getImageAnnotationAPI(imageId);
      if (res.data){
        setApiError(false);
        setImageDetails({
          id: res.data?.id,
          image: res.data?.image,
          user: res.data?.user
        });

        const lannotations = res.data?.annotations || []
        const finalList  = []
        lannotations.forEach(item => {
          finalList.push(...item.annotations)
        })
        setAnnotations(finalList)
      }else{
        setApiError(true)
      }
      setLoading(false);
    }
    if (imageId){ getImageAnnotation()}
  }, [imageId])

  const onChange = (data) => {
    setAnnotation(data)
  }
 
  const onSubmit = (annotation) => {
    const { geometry, data } = annotation
 
    let temp = [...annotations];
    temp.push({
      geometry,
        data: {
          ...data,
          id: Math.random()
        }
    })
    setAnnotations(temp)
  }

  const saveAnnotations = async () => {
    const res = await saveImageAnnotationAPI(imageId, annotations)
    if (res.data){
      notification.success({
        message: 'Success',
        description: 'Successfully saved image annotations.'
      })
    }else{
      notification.error({
        message: 'Error',
        description: 'Failed to save image annotations.'
      })
    }
  }

  const resetAnnotations =  async () => {
    const res = await resetAnnotationsAPI(imageId);
    if(res.data){
      notification.success({
        message: 'Success',
        description: 'Successfully cleared image annotations.'
      });
      setAnnotations([]);
    }else{
      notification.error({
        message: 'Error',
        description: 'Failed to reset image annotations.'
      })
    }
  }

  return (
    <Card>
      <h2>Annotate Image
        {annotations.length ? 
        <>
          <Button
            className="btn-success float-right"
            onClick={saveAnnotations}>Save</Button>
          <Button
            onClick={resetAnnotations}
            className="btn-warning float-right" style={{marginRight: '5px'}}>Reset</Button>
        </>
        : null }
        {/*
        <Button
            className="btn-danger float-right" style={{marginRight: '5px'}}>Delete Image</Button>
        */}
      </h2>
      <Divider style={{ marginTop: '5px'}}/>
      {loading ? <Spin />
      :<div className='align-center'>
        <Annotatoin
          src={`${baseURl}${imageDetails.image}`}
          annotations={annotations}
          value={annotation}
          type='RECTANGLE'
          style={{width: '800px', height: '500px'}}
          onChange={onChange}
          onSubmit={onSubmit}
          //renderEditor={input}
          />
      </div>
      }
      {
        (!imageId || apiError) ? 
        <>
          <Alert
            type='error'
            message="Error"
            showIcon
            description="Failed to load image details from server."/>
        </>
        : null
      }

    </Card>
  )
}

export default ImageAnnotation;