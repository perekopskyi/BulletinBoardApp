import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { register, RegistrationBody } from '../../api/auth'
import { AuthContext } from '../Auth/AuthProvider'
import { Loader } from '../../components/Loader'

const { Title } = Typography

export const Register = () => {
  const { authError, onLogin, isLoginLoading }: any = useContext(AuthContext)
  const {
    isLoading,
    error: registerError,
    data,
    mutateAsync,
  } = useMutation((values: RegistrationBody) => register(values))

  const [loginData, setLoginData] = useState({})

  useEffect(() => {
    if (data !== undefined && Object.keys(loginData).length) {
      onLogin(loginData)
    }
  }, [data, loginData])

  const onFinish = async (values: any) => {
    setLoginData({ username: values.username, password: values.password })
    // TODO create validation for confirm password
    await mutateAsync(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  if (isLoginLoading) return <Loader />

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Title level={1} className="text-center my-12">
        Sign up
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
          rules={[
            { required: true, message: 'Username should be unique' },
            { min: 2, message: 'Username should be at least 3 characters' },
            { whitespace: true },
          ]}
          className="w-full"
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input correct email' },
            { whitespace: true },
          ]} //TODO add validator
          className="w-full"
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { whitespace: true },
          ]}
          className="w-full"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Password confirmation"
          name="passwordConfirm"
          rules={[
            { required: true, message: 'Please input your password!' },
            { whitespace: true },
            { enum: ['password'] },
          ]}
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
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {authError || registerError ? (
        <Alert message={`${authError || registerError}`} type="error" />
      ) : null}
    </div>
  )
}
