const passwordValidator = (password: string) => {
  const uppercaseRegExp = /(?=.*?[A-Z])/
  const lowercaseRegExp = /(?=.*?[a-z])/
  const digitsRegExp = /(?=.*?[0-9])/
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/

  const uppercasePassword = uppercaseRegExp.test(password)
  const lowercasePassword = lowercaseRegExp.test(password)
  const digitsPassword = digitsRegExp.test(password)
  const specialCharPassword = specialCharRegExp.test(password)

  let errMsg = ''

  if (!uppercasePassword) {
    errMsg = 'Sua senha deve ter pelo menos uma letra maiuscula'
  } else if (!lowercasePassword) {
    errMsg = 'Sua senha deve ter pelo menos uma letra minuscula'
  } else if (!digitsPassword) {
    errMsg = 'Sua senha deve ter pelo menos um numero'
  } else if (!specialCharPassword) {
    errMsg = 'Sua senha deve ter pelo menos um caracter especial'
  } else {
    errMsg = ''
  }

  return errMsg
}

export default passwordValidator
