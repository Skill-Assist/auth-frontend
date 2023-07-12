'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import InputMask from 'react-input-mask'
import { TailSpin, ThreeDots } from 'react-loader-spinner'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import { User } from '@/types/user'

import styles from './styles.module.scss'
import userService from '@/services/userService'
import { useRouter } from 'next/navigation'

const titleDropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
}

const formDropIn = {
  hidden: {
    y: '100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
}

const SignUp = () => {
  const [userData, setUserData] = useState<User | null>(null)
  const [role, setRole] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirmedPass, setConfirmedShowPass] = useState(false)
  const [differentPasswords, setDifferentPasswords] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noRole, setNoRole] = useState(false)

  const router = useRouter()

  const nicknameInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const confirmedPasswordInputRef = useRef<HTMLInputElement>(null)
  const nationalIdInput = useState('')
  const mobilePhoneInput = useState('')

  const togglePassword = () => {
    setShowPass(!showPass)
  }

  const toggleConfirmedPassword = () => {
    setConfirmedShowPass(!showConfirmedPass)
  }

  useEffect(() => {
    const data = localStorage.getItem('userData')
    if (data) {
      setUserData(JSON.parse(data))
    }
  }, [])

  if (!userData) {
    return (
      <div className={styles.loading}>
        <TailSpin
          height="80"
          width="80"
          color="var(--highlight-1)"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    )
  }

  const firstName = userData.name.split(' ')[0]

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const enteredNickname = nicknameInputRef.current?.value
    const enteredName = nameInputRef.current?.value
    const enteredEmail = emailInputRef.current?.value
    const enteredPassword = passwordInputRef.current?.value
    const enteredConfirmedPassword = confirmedPasswordInputRef.current?.value
    const enteredMobilePhone = mobilePhoneInput[0]
    const enteredNationalId = nationalIdInput[0]

    if (
      !enteredNickname ||
      !enteredName ||
      !enteredEmail ||
      !enteredPassword ||
      !enteredConfirmedPassword ||
      !enteredMobilePhone ||
      !enteredNationalId
    ) {
      alert('Preencha todos os campos')
      setLoading(false)
      return
    }

    if (enteredPassword !== enteredConfirmedPassword) {
      setDifferentPasswords(true)
      setLoading(false)
      return
    }
    setDifferentPasswords(false)

    if (role === '') {
      setNoRole(true)
      setLoading(false)
      return
    }
    setNoRole(false)

    const newUser = {
      nickname: enteredNickname,
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      nationalId: enteredNationalId,
      mobilePhone: enteredMobilePhone,
      roles: [role],
    }

    const response = await userService.signUp(newUser)

    if (response.error) {
      console.log(response)
      setLoading(false)
      return
    }

    if (role === 'candidate') {
      router.push(`${process.env.NEXT_PUBLIC_USER_APP_URL}`)
    } else if (role === 'recruiter') {
      router.push(`${process.env.NEXT_PUBLIC_COMPANY_APP_URL}`)
    } else {
      alert('Papel não reconhecido')
    }
  }

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        variants={titleDropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 onClick={() => console.log(role)}>Bem Vindo, {firstName}</h1>
        <p>Antes de começarmos, precisamos de mais algumas informações.</p>
      </motion.div>
      <motion.form
        className={styles.form}
        variants={formDropIn}
        onSubmit={handleSignUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.roleContainer}>
          <h2>Qual o seu papel?</h2>
          <div>
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={role === 'candidate' ? styles.active : ''}
            >
              Candidato
            </button>
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className={role === 'recruiter' ? styles.active : ''}
            >
              Recrutador
            </button>
          </div>
        </div>
        <div className={styles.firstLine}>
          <div className={`${styles.field} ${styles.nickNameField}`}>
            <label htmlFor="nickname">Como gostaria de ser chamado?</label>
            <input
              id="nickname"
              type="text"
              ref={nicknameInputRef}
              placeholder=""
              maxLength={20}
              minLength={3}
              required
            />
          </div>
        </div>
        <div className={styles.line}>
          <div className={styles.field}>
            <label htmlFor="name">
              {role === 'candidate' ? 'Nome' : 'Razão Social'}
            </label>
            <input
              id="name"
              type="text"
              ref={nameInputRef}
              defaultValue={userData.name}
              placeholder="Digite seu nome"
              maxLength={20}
              minLength={3}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              ref={emailInputRef}
              defaultValue={userData.email}
              placeholder="Digite seu E-mail"
              required
            />
          </div>
        </div>
        <div className={styles.line}>
          <div className={styles.field}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type={showPass ? 'text' : 'password'}
              ref={passwordInputRef}
              defaultValue={userData.password}
              placeholder="Digite sua senha"
              minLength={8}
              required
            />
            {showPass && (
              <AiFillEyeInvisible
                fill="var(--highlight-1)"
                size={18}
                onClick={togglePassword}
              />
            )}
            {!showPass && (
              <AiFillEye
                fill="var(--highlight-1)"
                size={18}
                onClick={togglePassword}
              />
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Confirme sua senha</label>
            <input
              id="confirmedPassword"
              type={showConfirmedPass ? 'text' : 'password'}
              ref={confirmedPasswordInputRef}
              placeholder="Confirme sua senha"
              minLength={8}
              required
            />
            {showConfirmedPass && (
              <AiFillEyeInvisible
                fill="var(--highlight-1)"
                size={18}
                onClick={toggleConfirmedPassword}
              />
            )}
            {!showConfirmedPass && (
              <AiFillEye
                fill="var(--highlight-1)"
                size={18}
                onClick={toggleConfirmedPassword}
              />
            )}
          </div>
        </div>
        <div className={styles.line}>
          <div className={styles.field}>
            <label htmlFor="nationalId">
              {role === 'candidate' ? 'CPF' : 'CNPJ'}
            </label>
            <InputMask
              id="nationalId"
              mask={
                role === 'candidate' ? '999.999.999-99' : '99.999.999/9999-99'
              }
              placeholder={
                role === 'candidate' ? 'Digite seu CPF' : 'Digite seu CNPJ'
              }
              type="text"
              onChange={(e) => nationalIdInput[1](e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="mobilePhone">Telefone</label>
            <InputMask
              id="mobilePhone"
              mask="(99) 99999-9999"
              type="text"
              placeholder="Digite um telefone de contato"
              onChange={(e) => mobilePhoneInput[1](e.target.value)}
            />
          </div>
        </div>
        <p className={styles.error}>
          {noRole === true && <span>Selecione um papel</span>}
        </p>
        <p className={styles.error}>
          {differentPasswords === true ? (
            <span>As senhas precisasm ser iguais</span>
          ) : (
            <span>&nbsp;</span>
          )}
        </p>
        <div className={styles.actions}>
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
            ) : (
              <span>Continuar</span>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  )
}

export default SignUp
