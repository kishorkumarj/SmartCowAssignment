import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { MailOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import { registerUserApi } from '../../utils/apis';

const RegisterForm = ({
  switchView,
  successLogin
}:{
  switchView: () => void,
  successLogin: (param: any) => void
}) => {

  const [form] = useForm();
  const [loading, setLoading] = useState(false)

  const doRegister = async (formData: any) => {
    setLoading(true);
    const res = await registerUserApi(formData);
    if (res.data){
      notification.success({message: `Welcome ${res.data?.username}`})
      localStorage.setItem(constants.authToken, res.data.token);
      successLogin(res.data);
    }else{
      notification.error({
        message: 'Error',
        description: 'Failed to create account'
      })
    }
    setLoading(false)
  }

  return (
    <>
      <div className='login-base-text align-center m-b-50'>Register your account!!</div>
      
      <div className='form-container'>
        <Form
          form={form}
          onFinish={doRegister}>

          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input
              placeholder='Email'
              prefix={<MailOutlined className="login-input-icon" />}/>
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input
              type="password"
              placeholder='Password'
              prefix={<LockOutlined className="login-input-icon" />}/>
          </Form.Item>

          <Form.Item
            name='confirmpassword'
            rules={[{ required: true, message: 'Please confirm your password!' }]}>
            <Input
              type="password"
              placeholder='Confirm Password'
              prefix={<LockOutlined className="login-input-icon" />}/>
          </Form.Item>
          
          <Form.Item className='align-center'>
            <Button
              className='btn-success'
              loading={loading}
              //disabled={loading}
              htmlType='submit'>Register</Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <span
          className='float-right action-link'
          onClick={switchView}><ArrowLeftOutlined /> Back to Login</span>
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    successLogin: (userInfo: any) => dispatch({type: actionTypes.SET_LOGIN, ...userInfo})
  }
}

export default connect(null, mapDispatchToProps)(RegisterForm);