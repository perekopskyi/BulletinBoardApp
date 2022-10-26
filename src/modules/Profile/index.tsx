import { useMutation, useQuery } from '@tanstack/react-query'
import { Alert, Form, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { getUser, updateUser } from '../../api/users'
import Button from '../../components/Button'
import { Loader } from '../../components/Loader'
import { ProfileRow } from '../../components/ProfileRow'
import { formatDate } from '../../shared/dateFormatter'
import { useAuth } from '../../shared/useAuth'

export const Profile = () => {
  const [touched, setTouched] = useState(false)
  const {
    loggedIn: {
      user: { id },
    },
  } = useAuth()

  const {
    data = {},
    error,
    isLoading,
    isFetched,
  } = useQuery(['user', id], () => getUser(id), {})

  const {
    data: updateUserData,
    isLoading: updateUserLoading,
    error: updateUserError,
    isSuccess: updateUserSuccess,
    mutateAsync,
  } = useMutation(['user', id], (values: any) => updateUser(id, values))

  const onFieldsChange = () => {
    setTouched(true)
  }

  const onFinish = (values: any) => {
    console.log('onFinish form:', values)
    mutateAsync(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  if (isFetched && error) {
    return <Alert message={`${error}`} type="error" />
  }

  if (isLoading) return <Loader />

  return (
    <div className="">
      <Typography.Title level={1}>Profile</Typography.Title>

      {updateUserSuccess ? (
        <div className="mb-4">
          <Alert showIcon closable message={`Updated success`} type="success" />
        </div>
      ) : null}

      {updateUserError ? (
        <div className="mb-4">
          <Alert
            showIcon
            closable
            message={`${updateUserError}`}
            type="error"
          />
        </div>
      ) : null}

      <Form
        className="flex flex-col items-center min-w-3/4 max-w-1/2"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFieldsChange={onFieldsChange}
      >
        <Form.Item
          label="Username"
          name="username"
          className="w-full"
          rules={[
            { whitespace: true, message: `Username shouldn't be empty` },
            { min: 2, message: 'Username should be at least 2 characters' },
          ]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Email" name="email" className="w-full">
          <Input type="email" />
        </Form.Item>

        <Form.Item label="First Name" name="firstName" className="w-full">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" className="w-full">
          <Input type="text" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            disabled={!touched}
            loading={updateUserLoading}
          >
            Update
          </Button>
        </Form.Item>
      </Form>

      <table>
        <tbody>
          <ProfileRow {...{ title: 'ID', value: data.id }} />
          <ProfileRow
            {...{ title: 'Created', value: formatDate(data.created) }}
          />
          <ProfileRow {...{ title: 'Posts', value: data.posts.length }} />
        </tbody>
      </table>

      {error ? <Alert message={`${error}`} type="error" /> : null}
    </div>
  )
}
