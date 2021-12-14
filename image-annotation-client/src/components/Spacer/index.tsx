import React from 'react';

const Spacer = ({height}: {height: number}) => {
  return (
    <div style={{height: `${height}px`}}></div>
  )
}

export default Spacer