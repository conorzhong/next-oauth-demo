// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const code = request.query.code
  console.log('code', code)

  const codeResponse = await (
    await fetch(
      'https://github.com/login/oauth/access_token?' +
        `client_id=${CLIENT_ID}&` +
        `client_secret=${CLIENT_SECRET}&` +
        `code=${code}`,
      {
        method: 'post',
        headers: {
          accept: 'application/json',
        },
      }
    )
  ).json()
  console.log('codeResponse', codeResponse)

  const accessToken = codeResponse.access_token
  const result = await (
    await fetch('https://api.github.com/user', {
      method: 'get',
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`,
      },
    })
  ).json()
  console.log('result', result)

  const login = result.login
  return response.redirect(`/welcome?login=${login}`)
}
