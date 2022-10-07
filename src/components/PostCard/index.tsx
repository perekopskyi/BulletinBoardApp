import { Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../modules/App/routes'
import { formatDate } from '../../shared/dateFormatter'
import styles from './PostCard.module.scss'

const { Title, Text, Paragraph } = Typography

export type PostCardProps = {
  post: object
}

export const PostCard = (props: PostCardProps) => {
  const { author, created, id, image, text, title }: any = props.post

  return (
    <div className={`m-4 border flex rounded-lg ${styles.PostCard}`}>
      <div className="flex justify-center items-center w-1/3 h-full">
        <img
          src={image || 'http://placekitten.com/g/800/800'}
          alt="placeholder"
          className="h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div id="content" className="p-4 flex flex-col justify-between w-2/3">
        <div>
          <Link to={`/${ROUTES.POSTS}/${id}`}>
            <Title level={4} className="hover:underline">
              {title}
            </Title>
          </Link>
          <Paragraph className={styles['paragraph']}>{text}</Paragraph>
        </div>

        <div className="flex">
          <div className="mr-12">
            <Text>Created: </Text>
            <Text type="secondary">{formatDate(created)}</Text>
          </div>
          <div>
            <Text>Author: </Text>
            <Text type="secondary">{author.username}</Text>
          </div>
        </div>
      </div>
    </div>
  )
}
