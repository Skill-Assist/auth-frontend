import { ReactNode } from 'react'
import '@/styles/globals.scss'
import Head from './head'
import Image from 'next/image'

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
        {children}
      </body>
    </html>
  )
}
