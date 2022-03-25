import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const AUTHORIZE_URI = 'https://github.com/login/oauth/authorize'
const REDIRECT_PATH = '/api/oauth/callback'

const Home: NextPage = () => {
  const [redirectURI, setRedirectURI] = useState('')
  useEffect(() => {
    setRedirectURI(window.location.origin + REDIRECT_PATH)
  }, [])
  return (
    <div>
      <Link
        href={`${AUTHORIZE_URI}?client_id=${CLIENT_ID}&redirect_uri=${redirectURI}`}
      >
        <a>Login with Github</a>
      </Link>
    </div>
  )
}

export default Home
