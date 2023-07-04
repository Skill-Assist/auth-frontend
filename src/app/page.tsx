'use client'

import { FC, FormEvent, useRef, useState } from 'react'
import { useLottie } from 'lottie-react'
import { useRouter } from 'next/navigation'

import { FcGoogle } from 'react-icons/fc'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import workingMan from '../../public/working-tech.json'

import styles from './styles.module.scss'
import userService from '@/services/userService'
import { ThreeDots } from 'react-loader-spinner'

const Login: FC = () => {
  const router = useRouter()
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const [signIn, setSignIn] = useState(false)
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
      alert('Preencha todos os campos')
      setLoading(false)
      return
    }

    const response = await userService.signIn(enteredEmail, enteredPassword)

    if (response.error) {
      setError('Usuário ou senha incorretos')
      setLoading(false)
      return
    }

    router.push(`${process.env.NEXT_PUBLIC_USER_APP_URL}`)

    setLoading(false)
  }

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const enteredName = nameInputRef.current?.value
    const enteredEmail = emailInputRef.current?.value
    const enteredPassword = passwordInputRef.current?.value

    if (!enteredName || !enteredEmail || !enteredPassword) {
      alert('Preencha todos os campos')
      setLoading(false)
      return
    }

    // VERIFICAR SE O EMAIL JÁ ESTÁ EM USO

    // const response = await userService.signUp(enteredEmail, enteredPassword)

    // if (response.error) {
    //   setError('Esse email já está em uso')
    //   setLoading(false)
    //   return
    // }

    const userData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    }

    localStorage.setItem('userData', JSON.stringify(userData))

    router.push('/signup')
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.login}>
          <div className={styles.text}>
            <h1>{signIn ? 'Entre em ' : 'Crie'} sua conta</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. (slogan)
            </p>
          </div>
          <button className={styles.googleBtn}>
            <FcGoogle />
            {signIn ? 'Login ' : 'Cadastre-se '}
            com Google
          </button>
          <div className={styles.or}>
            <hr />
            <p>or</p>
            <hr />
          </div>
          <form
            className={styles.form}
            onSubmit={signIn ? handleLogin : handleSignUp}
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
                Password <span>*</span>
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
                  fill="var(--highlight-1)"
                  size={18}
                  onClick={togglePassword}
                />
              )}
              {!show && (
                <AiFillEye
                  fill="var(--highlight-1)"
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
          <div className={styles.footer}>
            {signIn ? (
              <p>
                Não possui uma conta?{' '}
                <a onClick={() => setSignIn(false)}>Sign Up</a>
              </p>
            ) : (
              <p>
                Já possui uma conta?{' '}
                <a onClick={() => setSignIn(true)}>Sign In</a>
              </p>
            )}
          </div>
        </div>
        <div className={styles.animation}>{View}</div>
      </div>
    </>
  )
}
export default Login
