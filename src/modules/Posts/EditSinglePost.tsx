import { useMutation, useQuery } from '@tanstack/react-query'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createPost, getPost, removePost, updatePost } from '../../api/posts'
import { Loader } from '../../components/Loader'
import { ProfileRow } from '../../components/ProfileRow'
import { TextArea } from '../../components/TextArea'
import { parseIdFromUrl } from '../../shared/smallUtils'
import { useAuth } from '../../shared/useAuth'
import { ROUTES } from '../App/routes'

const NEW = 'new'

export const EditSinglePost: React.FC = () => {
  const [touched, setTouched] = useState(false)
  const { loggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const postId = parseIdFromUrl(location.pathname)

  const isNewPost = postId === NEW

  const {
    data = {},
    error,
    isFetching,
  } = useQuery(['singlePost', isNewPost, postId], () => getPost(postId), {
    enabled: !isNewPost,
  })

  const {
    isLoading: updatePostLoading,
    error: updatePostError,
    data: updatePostData,
    mutate: updatePostMutate,
    isSuccess: updatePostSuccess,
  } = useMutation((values: any) => updatePost(postId, values))

  const {
    isLoading: removePostLoading,
    error: removePostError,
    data: removePostData,
    mutate: removePostMutate,
  } = useMutation(() => removePost(postId))

  const {
    isLoading: createPostLoading,
    error: createPostError,
    data: createPostData,
    mutate: createPostMutate,
  } = useMutation((values: any) => createPost(values))

  useEffect(() => {
    if (createPostData) navigate(`/${ROUTES.POSTS}/${createPostData.id}`)
  }, [createPostData])

  const onFieldsChange = () => setTouched(true)

  const onFinish = (values: any) => {
    console.log('onFinish form:', values)
    isNewPost ? createPostMutate(values) : updatePostMutate(values)
  }

  const onRemovePost = () => {
    removePostMutate()
    navigate(`/${ROUTES.POSTS}`)
  }

  if (!loggedIn)
    return <Alert message="Please login to edit post" type="info" />

  if (isFetching) return <Loader />
  if (error) return <Alert type="error" message={error.toString()} />

  return (
    <>
      <div className="flex items-center">
        <Typography.Title>
          {isNewPost ? 'Create' : 'Edit'} Post
        </Typography.Title>
        <Link to={`/${ROUTES.POSTS}/${postId}`}>
          <EyeOutlined className="ml-4" twoToneColor="#eb2f96" />
        </Link>
      </div>

      {updatePostSuccess ? (
        <div className="mb-4">
          <Alert showIcon closable message={`Updated success`} type="success" />
        </div>
      ) : null}

      {updatePostError ? (
        <div className="mb-4">
          <Alert
            showIcon
            closable
            message={`${updatePostError}`}
            type="error"
          />
        </div>
      ) : null}

      <Form
        className="flex flex-col items-center min-w-3/4 max-w-1/2"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ text: data.text, title: data.title }}
        onFinish={onFinish}
        autoComplete="off"
        onFieldsChange={onFieldsChange}
      >
        <Form.Item label="Title" name="title" className="w-full">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="text" className="w-full">
          <TextArea itemType="text" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            disabled={!touched}
            loading={updatePostLoading}
          >
            {isNewPost ? 'Save' : 'Update'}
          </Button>
          <Button
            danger
            htmlType="button"
            style={{ margin: '0 8px' }}
            onClick={onRemovePost}
          >
            Remove
          </Button>
        </Form.Item>
      </Form>
      <table>
        <tbody>
          <ProfileRow {...{ title: 'Id', value: data.id }} />
          <ProfileRow {...{ title: 'Created', value: data.created }} />
          <ProfileRow {...{ title: 'Author', value: data?.author?.username }} />
          {/* <ProfileRow {...{ title: 'views', value: data.views }} /> */}
        </tbody>
      </table>
    </>
  )
}
