import { useAuthStore } from '~~/store'

export default defineNuxtPlugin(async () => {
  const headers = useRequestHeaders(['cookie'])
  const str = headers.cookie.split(' ').find(string => string.startsWith('userToken='))
  if (str?.length > 0) {
    const token = str.split('=')[1]
    if (token) {
      const { jwtDecode } = authHook()
      const { setJWTasUser } = useAuthStore()
      const { storeUsersEntities } = userHook()
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
      if (!data.message) {
        storeUsersEntities(data)
      }
    }
  }
})
