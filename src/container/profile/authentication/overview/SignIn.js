import React, { useState, useCallback, useEffect } from 'react';
import { hashHistory } from 'react-router';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Auth0Lock } from 'auth0-lock';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { auth0options } from '../../../../config/auth0';
import AuthContext from '../../../../contexts/AuthContext';
import { useContext } from 'react';
import actions from '../../../../redux/authentication/actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  const authContext = useContext(AuthContext);
  const { loginUser, user, errors, setErrors, authTokens } = authContext;
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [state, setState] = useState({
    checked: null,
  });

  const lock = new Auth0Lock(clientId, domain, auth0options);

  // const handleSubmit = useCallback(() => {
  // dispatch(login());
  //   history.push('/admin');
  // }, [history, dispatch]);

  // useEffect(() => {
  //   if (authTokens != null) {
  //     dispatch(loginSuccess(true));
  //     history.push('/');
  //   }
  // }, [authTokens]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const validationErrors = {};
      if (!formData.email.trim()) {
        validationErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        validationErrors.email = 'Email is not valid';
      }

      if (!formData.password.trim()) {
        validationErrors.password = 'Password is required';
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        loginUser(formData.email, formData.password);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      // if (err.response) {
      //   toast.error(t(`error_code.${err.response.data.error_code}`));
      // }
    }
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    console.log('name:', name);
    console.log('value:', value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
        <Form name="login" form={form} onFinish={() => handleSubmit(formData)} layout="vertical">
          <Heading as="h3">
            Đăng nhập
          </Heading>
          <Form.Item
            
            rules={[
              { message: 'Please input your username or Email!', required: true }
            ]}
            initialValue="name@example.com"
            label="Username or Email Address"
          >
            <Input name="email" onChange={handleChangeForm}/>
          </Form.Item>
          <Form.Item
            name="password"
            initialValue="123456"
            label="Password"
            rules={[
              {required: true, message: 'Trường không được trống' }
            ]}
          >
            <Input.Password placeholder="Password" name="password" onChange={handleChangeForm}/>
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange} checked={state.checked}>
              Keep me logged in
            </Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
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
