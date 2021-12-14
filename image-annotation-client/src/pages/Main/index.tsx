import React from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../Home';
import MyAnnotations from '../MyAnnotations';

import SideComponent from '../../components/Layout/sidebar';
import PageHeader from '../../components/Layout/header';
import LoginRequired from '../LoginRequired';
import ImageAnnotation from '../ImageAnnotation';

const { Content } = Layout;

const Main = ({
  collapsed,
  loggedIn
}: {
  collapsed: boolean,
  loggedIn: true
}) => {

  return (
    <LoginRequired loggedIn={loggedIn}>
      <Layout style={{minHeight: '100vh'}}>
        <SideComponent />
        <Layout className={collapsed ? 'collapsed-layout' : 'expanded-layout'}>
          <PageHeader />
          <Content className="conent-base-container">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/my-annotations" element={<MyAnnotations />} />
              <Route path="/annotate/:imageId" element={<ImageAnnotation />}/>
              <Route path="*" element={<Home />}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </LoginRequired>
  )
}


const mapStateToProps = (state: any) => {
  return {
    collapsed: state.app.collapseMenu,
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps)(Main);