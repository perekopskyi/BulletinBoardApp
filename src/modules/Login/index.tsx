import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert, Checkbox, Form, Input, Typography } from 'antd'
import { AuthContext } from '../Auth/AuthProvider'
import { Loader } from '../../components/Loader'
import Button from '../../components/Button'
import { LOCAL_STORAGE } from '../../shared/constants'
import { GoogleLoginButton } from './GoogleLogin'

const { Title } = Typography

type Inputs = {
  username: string
  password: string
}

export const Login = () => {
  const { authError, onLogin, isLoginLoading }: any = useContext(AuthContext)
  const navigate = useNavigate()
  const location: any = useLocation()

  const loggedIn = localStorage.getItem(LOCAL_STORAGE.loggedIn)

  useEffect(() => {
    if (loggedIn) {
      const origin = location.state?.from?.pathname || '/'
      navigate(origin)
    }
  }, [loggedIn])

  const onFinish = (values: Inputs) => {
    console.log('Success:', values)
    onLogin(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  if (isLoginLoading) return <Loader />

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Title level={1} className="text-center my-12">
        Please login
      </Title>
      <Form
        className="flex flex-col items-center min-w-3/4 max-w-1/2"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          className="w-full"
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className="w-full"
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="w-full">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {authError ? <Alert message={`${authError}`} type="error" /> : null}
      Try with:
      <GoogleLoginButton />
    </div>
  )
}
