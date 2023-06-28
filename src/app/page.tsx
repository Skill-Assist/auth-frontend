'use client'

import { FC } from 'react'
import { useLottie } from 'lottie-react'
import Image from 'next/image'

import Footer from '@/components/Footer'

import { FcGoogle } from 'react-icons/fc'
import workingMan from '../../public/working-tech.json'

import styles from './styles.module.scss'

const Login: FC = () => {
  const options = {
    animationData: workingMan,
    loop: true,
  }

  const { View } = useLottie(options)

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
        <div className={styles.card}>
          <h2>Acesse a plataforma</h2>
          <button className={styles.googleBtn}>
            Acesse com <FcGoogle />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
export default Login
