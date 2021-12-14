import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Main from './pages/Main';
import { AppLoader } from './components/Loader';

interface AppInterface {
  baseUrl: string,
  loading: boolean
}

const App = ({
  baseUrl,
  loading
}: AppInterface) => {

  if (loading){ return <AppLoader /> }

  return (
    <BrowserRouter basename={baseUrl}>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.app.loading
  }
}

export default connect(mapStateToProps)(App);
