import { User } from '@/types/user'
import axios from 'axios'
import cookie from 'react-cookies'

const API_URL = 'http://localhost:5500/api/v1'

const userService = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      })

      cookie.save('token', response.data.access_token, {})
      return response
    } catch (error: any) {
      return error.response.data
    }
  },

  signUp: async (body: User) => {
    const { name, email, password, roles, nationalId, mobilePhone } = body

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        roles,
        nationalId,
        mobilePhone,
      })

      cookie.save('token', response.data.access_token, {})
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },

  updateProfile: async (body: any) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        body,
      })

      cookie.save('token', response.data.access_token, {})
      return response
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
      return profile
    } catch (error: any) {
      return error.response
    }
  },
}

export default userService
