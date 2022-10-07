import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Typography } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { getPost } from '../../api/posts'
import { Loader } from '../../components/Loader'
import { ProfileRow } from '../../components/ProfileRow'
import { parseIdFromUrl } from '../../shared/smallUtils'
import { useAuth } from '../../shared/useAuth'
import { EditSinglePost } from './EditSinglePost'

const NEW = 'new'

export const SinglePost: React.FC = () => {
  const { loggedIn } = useAuth()
  const location = useLocation()
  const postId = parseIdFromUrl(location.pathname)

  const isNewPost = postId === NEW

  const {
    data = {},
    error,
    isLoading,
    isFetching,
  } = useQuery(['singlePost', isNewPost, postId], () => getPost(postId), {
    enabled: !isNewPost,
  })

  const isAuthorsPost = data.author?.username === loggedIn?.user?.username

  if (isNewPost) return <EditSinglePost />
  if (isFetching || isLoading) return <Loader />
  if (error) return <Alert type="error" message={error.toString()} />

  return (
    <>
      <Typography.Title>{data.title}</Typography.Title>
      <Typography.Paragraph>{data.text}</Typography.Paragraph>
      {isAuthorsPost ? (
        <Link to={`edit`}>
          <Button type="primary" className="mb-4">
            Edit
          </Button>
        </Link>
      ) : null}
      <table>
        <tbody>
          <ProfileRow {...{ title: 'Id', value: data.id }} />
          <ProfileRow {...{ title: 'Created', value: data.created }} />
          <ProfileRow {...{ title: 'Author', value: data.author.username }} />
          {/* <ProfileRow {...{ title: 'views', value: data.views }} /> */}
        </tbody>
      </table>
    </>
  )
}
