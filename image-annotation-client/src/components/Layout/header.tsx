import React, { useState } from 'react';
import { Layout, Avatar, Dropdown, Menu, Drawer } from 'antd';
import {
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
  UserOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actionTypes';
import './layout.scss';
import SideMenu from './menu';

const { Header } = Layout;

const PageHeader = ({
  userLogout,
  username
}: {
  userLogout: () => void,
  username: string
}) => {

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const onMobileMenuClose = () => {
    setMobileMenuVisible(false);
  }

  const menu = (
    <Menu>
      <Menu.Item key="2"
        className="user-menu-item"
        onClick={userLogout}
        icon={<LogoutOutlined style={{paddingRight: '3px'}}/>}>Logout</Menu.Item>
    </Menu>
  );

  const siderHeader = (
    <div className="portal-title-container">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
        width="30"
        alt="logo"
        height="30"/>
        <div className="portal-title">Image Annotation</div>
        <CloseOutlined
          className="mobile-menu-close-icon"
          onClick={() => setMobileMenuVisible(false)}/>
    </div>
  )

  return (
    <Header
      className="header-component">
        <div className="header-container">
          <div className="">
          <Dropdown
            overlay={menu}
            trigger={["click"]}>
            <div className="header-username" onClick={e => e.preventDefault()}>
              {username || 'User'}
            </div>
          </Dropdown>
              
          </div>
          <div>
            <Avatar icon={<UserOutlined />}/>
          </div>
          <div
            style={{
              flexGrow: 1,
              paddingLeft: '10px'
            }}>  
              <div className="mobile-menu">
                <Drawer
                  title={siderHeader}
                  placement="left"
                  className="mobile-menu-drawer"
                  visible={mobileMenuVisible}
                  closable={false}
                  onClose={onMobileMenuClose}
                  bodyStyle={{padding: '0px'}}
                  width={250}>
                  <SideMenu />
                </Drawer>
                <MenuOutlined
                  onClick={() => setMobileMenuVisible(true)}
                  className="mobile-menu-icon"/>
              </div>
            </div>
        </div>
      </Header>
  )
}

const mapStateToProps = (state: any) => {
  return {
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return{
    userLogout: () => dispatch({type: actionTypes.PERFORM_LOGOUT}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);