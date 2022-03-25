import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Welcome: NextPage = () => {
  const query = useRouter().query
  return <div>{`Welcome, ${query.login}`}</div>
}

export default Welcome
