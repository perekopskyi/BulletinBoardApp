import { Typography } from 'antd'

const { Title } = Typography

export const Login = () => {
  return (
    <>
      <Title level={1}>Please login</Title>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}
