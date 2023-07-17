import { User } from '@/types/user'
import axios from 'axios'
import cookie from 'react-cookies'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const userService = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      })

      cookie.save('token', response.data.access_token, {
        domain: `${process.env.NEXT_PUBLIC_COOKIE_DOMAIN_URL}`,
      })

      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },

  signUp: async (newUser: User) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, newUser)

      cookie.save('token', response.data.access_token, {
        domain: `${process.env.NEXT_PUBLIC_COOKIE_DOMAIN_URL}`,
      })
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },

  getProfile: async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.load('token')}`,
      },
    }
    try {
      const profile = await axios.get(`${API_URL}/user/profile`, config)
      return profile.data
    } catch (error: any) {
      return error.response
    }
  },
}

export default userService
