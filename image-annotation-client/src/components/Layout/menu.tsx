import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  HomeFilled,
  FileImageFilled
} from '@ant-design/icons'

const SideMenu = () => {

  return (
    <Menu
      defaultSelectedKeys={['home']}
      mode="inline">

      <Menu.Item
        key='home'
        icon={<HomeFilled style={{color: '#5e72e4 '}}/>}>
        <NavLink to='/home'>Image Gallery</NavLink>
      </Menu.Item>

      <Menu.Item
        key='my-annotations'
        icon={<FileImageFilled style={{color: '#2dce89'}}/>}>
        <NavLink to='/my-annotations'>My Annotations</NavLink>
      </Menu.Item>

    </Menu>
  )
}

export default SideMenu;