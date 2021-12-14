import React, {useState} from 'react';
import { Form, Input, Button, message, notification } from 'antd';
import { MailOutlined, LockOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { LoginApi } from '../../utils/apis';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';

const LoginForm = ({
  switchView,
  successLogin
}:{
  switchView: () => void,
  successLogin: (param: any) => void
}) => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const doLogin = async (formData: any) => {
    setLoading(true)
    const res: any = await LoginApi(formData);
    if(res.data){
      notification.success({message: `Welcome ${res.data?.username}`})
      localStorage.setItem(constants.authToken, res.data.token);
      successLogin(res.data);
    }else{
      notification.error({
        message: 'Unauthorized',
        description: 'Failed to login, Invalid credentials.'
      })
    }
    setLoading(false)
  }

  return (
    <>
      <div className='login-base-text align-center m-b-50'>Login here!!</div>
      <div className='login-form-container'>
        <Form
          form={form}
          onFinish={doLogin}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your email!' }]}>
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
      
          <Form.Item className='align-center'>
            <Button
              className='btn-info'
              loading={loading}
              disabled={loading}
              htmlType='submit'>Login</Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <span
          className='action-link'
          onClick={() => message.warning('Not yet enabled.')}>Forgot Password?</span>
        <span
          className='float-right action-link'
          onClick={switchView}><PlusCircleOutlined /> New Account</span>
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    successLogin: (userInfo: any) => dispatch({type: actionTypes.SET_LOGIN, ...userInfo})
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);