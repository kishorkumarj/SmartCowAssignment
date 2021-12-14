import React from 'react';
import { Spin } from 'antd';

export const AppLoader = () => {
  return (
    <div className='app-loader-css'>
      <Spin
        tip="Please wait..."
        size='large'/>
    </div>
  )
}