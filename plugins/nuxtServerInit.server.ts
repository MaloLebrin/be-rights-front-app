import { useAuthStore } from '~~/store'
import type { JWTDecodedType } from '~~/types'

export default defineNuxtPlugin(async () => {
  const headers = useRequestHeaders(['cookie'])
  // const router = useRouter().getRoutes()
  // console.log(router, '<==== router')
  const str = headers.cookie.split(' ').find(string => string.startsWith('userToken='))
  if (str?.length > 0) {
    const token = str.split('=')[1].replace(';', '')
    console.log(token, '<==== token')
    if (token) {
      const { setJWTasUser } = useAuthStore()
      const { storeUsersEntities } = userHook()

      function jwtDecode(jwt: any): JWTDecodedType | null {
        if (typeof jwt !== 'string' && !(jwt instanceof String))
          return null

        const splitted = jwt.split('.')
        if (splitted.length < 2)
          return null

        const obj1 = Buffer.from(splitted[0], 'base64').toString('utf-8')
        const obj2 = Buffer.from(splitted[1], 'base64').toString('utf-8')
        return {
          ...JSON.parse(obj1),
          ...JSON.parse(obj2),
        }
      }

      const decodedToken = jwtDecode(token)
      setJWTasUser(decodedToken)
      const res = await fetch(`${import.meta.env.VITE_API_URL}user/token`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      console.log(data, '<==== data')
      if (!data.message) {
        storeUsersEntities(data)
      }
    }
  }
})
