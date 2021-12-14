import React from 'react';

interface BreadCrumbInterface {
  title: string
}

const BreadCrumb = ({title}: BreadCrumbInterface) => {
  return (
    <div>{title}</div>
  )
}

export default BreadCrumb;