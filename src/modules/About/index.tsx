import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

export const About = () => {
  return (
    <div>
      <Title level={2}>About app</Title>
      <Paragraph>
        This app was builded with Create React App, TypeScript, React Query,
        Axios, AntDesign, Tailwind, SCSS modules.
      </Paragraph>
    </div>
  )
}
