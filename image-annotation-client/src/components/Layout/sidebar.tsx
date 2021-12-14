import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import * as actionTypes from '../../store/actionTypes';

import SideMenu from './menu'

const { Sider } = Layout;

const SideComponent = ({
  collapsed,
  setCollapseMenu
}:{
  collapsed: boolean,
  setCollapseMenu: (value:boolean) => void
}) => {

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapseMenu(!collapsed)}
      theme="light"
      width={250}
      className="sidebar-container">
      <div className={collapsed ? "portal-title-container-collapsed" : "portal-title-container"}>
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
          width="30"
          alt="logo"
          height="30"/>
          <div className={collapsed ? 'display-none': "portal-title "} >Image Annotation</div>
      </div>
      <SideMenu/>
    </Sider>
  )
}

const mapStateToProps = (state: any) => {
  return {
    collapsed: state.app.collapseMenu
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCollapseMenu: (collapsed: boolean) => dispatch({type: actionTypes.COLLAPSE_MENU, collapseMenu: collapsed}),
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(SideComponent);