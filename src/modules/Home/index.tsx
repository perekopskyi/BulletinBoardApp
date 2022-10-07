import { useQuery } from '@tanstack/react-query'
import { Alert, Typography } from 'antd'
import React from 'react'
import { getPosts } from '../../api/posts'
import { Loader } from '../../components/Loader'
import { PostCard } from '../../components/PostCard'

export const Home = () => {
  const { data, error, isLoading } = useQuery(['posts'], getPosts)

  if (isLoading) return <Loader />
  if (error) return <Alert type="error" message={error.toString()} />

  return (
    <div>
      <Typography.Title>Total posts ({data.count})</Typography.Title>

      <div className="flex flex-wrap justify-center">
        {data.posts.map((post: any, index: number) => (
          <PostCard key={index} {...{ post }} />
        ))}
      </div>
    </div>
  )
}
