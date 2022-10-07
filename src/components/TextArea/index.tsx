import React from 'react'
import { Input } from 'antd'
import styles from './TextArea.module.scss'

const { TextArea: AntdTextArea } = Input

export const TextArea = (props: any) => (
  <AntdTextArea className={styles.TextArea} {...props} />
)
