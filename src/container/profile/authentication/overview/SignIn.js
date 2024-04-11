import React, { useCallback, useState} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { Auth0Lock } from 'auth0-lock';
import { MdOutlinePassword } from "react-icons/md";
import { AuthWrapper } from './style';
import actionAuths from '../../../../redux/authentication/actions';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { auth0options } from '../../../../config/auth0';

import logoSSC from '../../../../static/img/Logo_Dark.svg';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const { loginBegin } = actionAuths;

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const lock = new Auth0Lock(clientId, domain, auth0options);

  const handleSubmit = useCallback(() => {
    const loginAction = loginBegin({
      request: {
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
      },
      history
    });

    dispatch(loginAction);
  }, [history, dispatch]);

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  lock.on('authenticated', authResult => {
    lock.getUserInfo(authResult.accessToken, error => {
      if (error) {
        return;
      }

      handleSubmit();
      lock.hide();
    });
  });

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/register">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <div style={{ marginBottom: '40px' }}>
            <Image src={logoSSC} preview={false} height="50px"/>
          </div>
          <Heading as="h3">
            Đăng nhập
          </Heading>
          <Form.Item
            name="email"
            rules={[
              { message: 'Please input your email!', required: true }
            ]}
            label="Email Address"
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {required: true, message: 'Trường không được trống' }
            ]}
          >
            <Input.Password prefix={<MdOutlinePassword />} placeholder="Mật khẩu" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange} checked={state.checked}>
              Giữ đăng nhập
            </Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Quên mật khẩu?
            </NavLink>
          </div>
          <Form.Item>
            <Button loading={isLoading} className="btn-signin" htmlType="submit" type="primary" size="middle">
              {isLoading ? 'Đang tải...' : 'Đăng nhập'}
            </Button>
          </Form.Item>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul>
          <div className="auth0-login">
            <Link to="#" onClick={() => lock.show()}>
              Sign In with Auth0
            </Link>
            <Link to="/fbSignIn">Sign In With Firebase</Link>
          </div>
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
