'use client'

import { FC, FormEvent, useRef, useState } from 'react'
import { useLottie } from 'lottie-react'
import { useRouter } from 'next/navigation'
// import { FcGoogle } from 'react-icons/fc'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'

import workingMan from '../../public/working-tech.json'

import userService from '@/services/userService'

import styles from './styles.module.scss'

const Login: FC = () => {
  const router = useRouter()
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  // const [signIn, setSignIn] = useState(true)
  const signIn = true
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const togglePassword = () => {
    setShow(!show)
  }

  const options = {
    animationData: workingMan,
    loop: true,
  }

  const { View } = useLottie(options)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const enteredEmail = emailInputRef.current?.value
    const enteredPassword = passwordInputRef.current?.value

    if (!enteredEmail || !enteredPassword) {
      toast.error('Preencha todos os campos')
      setLoading(false)
      return
    }

    const response = await userService.signIn(enteredEmail, enteredPassword)

    if (response.error) {
      setError('Usuário ou senha incorretos')
      setLoading(false)
      return
    }

    const role = response.userRole[0]

    if (role === 'candidate') {
      router.push(`${process.env.NEXT_PUBLIC_USER_APP_URL}`)
    } else if (role === 'recruiter') {
      router.push(`${process.env.NEXT_PUBLIC_COMPANY_APP_URL}`)
    } else {
      toast.error('Role diferente de "company" ou "candidate"', {
        duration: 3000,
        position: 'top-right',
      })
    }
  }

  // const handleSignUp = async (e: FormEvent) => {
  //   e.preventDefault()

  //   setLoading(true)

  //   const enteredName = nameInputRef.current?.value
  //   const enteredEmail = emailInputRef.current?.value
  //   const enteredPassword = passwordInputRef.current?.value

  //   if (!enteredName || !enteredEmail || !enteredPassword) {
  //     toast.error('Preencha todos os campos', {
  //       duration: 3000,
  //       position: 'top-right',
  //     })
  //     setLoading(false)
  //     return
  //   }

  //   // VERIFICAR SE O EMAIL JÁ ESTÁ EM USO

  //   const userData = {
  //     name: enteredName,
  //     nickname: enteredName.split(' ')[0],
  //     email: enteredEmail,
  //     password: enteredPassword,
  //   }

  //   localStorage.setItem('userData', JSON.stringify(userData))

  //   router.push('/signup')
  // }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.login}>
          <div className={styles.text}>
            <h1>{signIn ? 'Entre em ' : 'Crie'} sua conta</h1>
            <p>Simplificamos o processo de recrutamento com IA</p>
          </div>
          {/* <button className={styles.googleBtn}>
            <FcGoogle />
            {signIn ? 'Login ' : 'Cadastre-se '}
            com Google
          </button> */}
          {/* <div className={styles.or}>
            <hr />
            <p>or</p>
            <hr />
          </div> */}
          <form
            className={styles.form}
            // onSubmit={signIn ? handleLogin : handleSignUp}
            onSubmit={handleLogin}
          >
            {!signIn && (
              <div
                className={`${styles.field} ${error !== '' && styles.error}`}
              >
                <label htmlFor="name">
                  Nome <span>*</span>
                </label>
                <input
                  id="name"
                  type="name"
                  ref={nameInputRef}
                  placeholder="Digite seu nome"
                  maxLength={20}
                  minLength={3}
                  required
                />
              </div>
            )}
            <div className={`${styles.field} ${error !== '' && styles.error}`}>
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <input
                id="email"
                type="email"
                ref={emailInputRef}
                placeholder="Digite seu E-mail"
                pattern="[a-z0-9._%+]+@[a-z0-9.]+\.[a-z]{2,}$"
                required
              />
            </div>
            <div className={`${styles.field} ${error !== '' && styles.error}`}>
              <label htmlFor="password">
                Senha <span>*</span>
              </label>
              <input
                id="password"
                type={show ? 'text' : 'password'}
                ref={passwordInputRef}
                placeholder="Digite sua senha"
                minLength={8}
                required
              />
              {show && (
                <AiFillEyeInvisible
                  fill="var(--primary)"
                  size={18}
                  onClick={togglePassword}
                />
              )}
              {!show && (
                <AiFillEye
                  fill="var(--primary)"
                  size={18}
                  onClick={togglePassword}
                />
              )}
            </div>
            <p className={styles.error}>
              {error !== '' ? <span>{error}</span> : <span>&nbsp;</span>}
            </p>
            <button type="submit">
              {loading ? (
                <div>
                  <ThreeDots
                    height="15"
                    width="15"
                    radius="9"
                    color="#ffffff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                </div>
              ) : signIn ? (
                'Login'
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          {/* <div className={styles.footer}>
            {signIn ? (
              <p>
                Não possui uma conta?{' '}
                <a
                  onClick={() => {
                    setSignIn(false)
                    setError('')
                  }}
                >
                  Sign Up
                </a>
              </p>
            ) : (
              <p>
                Já possui uma conta?{' '}
                <a
                  onClick={() => {
                    setSignIn(true)
                    setError('')
                  }}
                >
                  Sign In
                </a>
              </p>
            )}
          </div> */}
        </div>
        <div className={styles.animation}>{View}</div>
      </div>
    </>
  )
}
export default Login
