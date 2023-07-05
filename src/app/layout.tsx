'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Head from './head'
import Image from 'next/image'

import cookies from 'react-cookies'
import userService from '@/services/userService'

import '@/styles/globals.scss'

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    if (cookies.load('token')) {
      const fetchData = async () => {
        const userResponse = await userService.getProfile()

        if (!userResponse) {
          setLoading(false)
          router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}`)
        }

        if (userResponse.roles.includes('candidate')) {
          router.push(`${process.env.NEXT_PUBLIC_USER_APP_URL}`)
        } else if (userResponse.roles.includes('recruiter')) {
          router.push(`${process.env.NEXT_PUBLIC_COMPANY_APP_URL}`)
        } else {
          setLoading(false)
        }
      }

      fetchData()
    } else {
      setLoading(false)
    }
  }, [router])

  return (
    <html lang="en">
      <Head />
      <body>
        {!loading && (
          <Image
            className="logo"
            src="/logo.svg"
            alt="Logo da plataforma"
            width={50}
            height={50}
          />
        )}
        {!loading && children}
      </body>
    </html>
  )
}
