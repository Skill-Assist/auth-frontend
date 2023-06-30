'use client'

import { FC, useRef } from 'react'
import { useLottie } from 'lottie-react'
import Image from 'next/image'

import Footer from '@/components/Footer'

import workingMan from '../../public/working-tech.json'

import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import userService from '@/services/userService'

const Login: FC = () => {
  const router = useRouter()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const options = {
    animationData: workingMan,
    loop: true,
  }

  const { View } = useLottie(options)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current?.value
    const enteredPassword = passwordInputRef.current?.value

    if (!enteredEmail || !enteredPassword) {
      alert('Preencha todos os campos')
      return
    }

    const response = await userService.signin(enteredEmail, enteredPassword)

    console.log(response)
    if (response.status === 200) {
      router.push('http://localhost:3001/')
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
              ref={emailInputRef}
              placeholder="E-mail"
              pattern="[a-z0-9._%+]+@[a-z0-9.]+\.[a-z]{2,}$"
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <input
              type="password"
              ref={passwordInputRef}
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
