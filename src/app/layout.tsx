import { ReactNode } from 'react'
import '@/styles/globals.scss'
import Head from './head'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head />
      <body>{children}</body>
    </html>
  )
}
