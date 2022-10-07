import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { getPostsByUserId } from '../../api/posts'
import { Loader } from '../../components/Loader'
import { PostCard } from '../../components/PostCard'
import { useAuth } from '../../shared/useAuth'

const { Title } = Typography

export const Posts: React.FC = () => {
  const auth = useAuth()
  const {
    loggedIn: {
      user: { id },
    },
  } = auth
  const { data, error, isLoading } = useQuery(['posts', id], () =>
    getPostsByUserId(id)
  )

  if (isLoading) return <Loader />
  if (error) return <Alert type="error" message={error.toString()} />

  return (
    <div>
      <div className="flex justify-between items-center">
        <Title>Your posts ({data.count})</Title>
        <Link to="new">
          <Button>Add post</Button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center">
        {data.posts.map((post: any, index: number) => (
          <PostCard key={index} {...{ post }} />
        ))}
      </div>
    </div>
  )
}
