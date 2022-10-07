import React, { useContext } from 'react'
import { Alert, Checkbox, Form, Input, Typography } from 'antd'
import { AuthContext } from '../Auth/AuthProvider'
import { Loader } from '../../components/Loader'
import Button from '../../components/Button'
import { loginOauth } from '../../api/auth'

const { Title } = Typography

type Inputs = {
  username: string
  password: string
}

export const Login = () => {
  const { authError, onLogin, isLoginLoading }: any = useContext(AuthContext)

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
      <Button disabled onClick={loginOauth}>
        OAUTH
      </Button>
    </div>
  )
}
