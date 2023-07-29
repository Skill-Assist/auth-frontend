'use client'

import { ReactNode } from 'react'
import Head from './head'
import Image from 'next/image'

import '@/styles/globals.scss'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head />
      <body>
        <Image
          className="logo"
          src="/logo.svg"
          alt="Logo da plataforma"
          width={50}
          height={50}
        />
        <>
          {children}
          <Toaster />
        </>
      </body>
    </html>
  )
}
