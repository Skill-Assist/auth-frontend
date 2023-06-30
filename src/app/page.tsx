'use client'

import { FC, useState } from 'react'
import { useLottie } from 'lottie-react'
import Image from 'next/image'

import Footer from '@/components/Footer'

import workingMan from '../../public/working-tech.json'

import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import userService from '@/services/userService'

const Login: FC = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const options = {
    animationData: workingMan,
    loop: true,
  }

  const { View } = useLottie(options)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const response = await userService.signin(user.email, user.password)

    console.log(response)
    if (response.status === 200) {
      router.push('https://www.google.com')
    } else {
      alert(response.data.message)
    }
  }

  return (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src="/logo.svg"
        alt="Logo da plataforma"
        width={50}
        height={50}
      />
      <div className={styles.login}>
        <div className={styles.banner}>{View}</div>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <h2>Acesse a plataforma</h2>
          <div className={styles.inputContainer}>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="E-mail"
              pattern="[a-z0-9._%+]+@[a-z0-9.]+\.[a-z]{2,}$"
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>

      <Footer />
    </div>
  )
}
export default Login
