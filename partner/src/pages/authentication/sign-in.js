import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { getSession, signIn } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'
import { useSearchParams, useRouter } from 'next/navigation'
import styles from '@/components/Authentication/Authentication.module.css'
import { Box, FormControlLabel, Button, Checkbox, Grid, TextField, Card, Typography, CircularProgress } from '@mui/material'

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // validate email or not 
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  //  validate password is there or not  
  const validatePassword = (password) => {
    return password.length >= 1
  }

  // email event => 
  const handleEmailChange = (event) => {
    const inputEmail = event.target.value.trim()
    setEmail(inputEmail)
    if (!validateEmail(inputEmail)) {
      setEmailError('Please enter a valid email address.')
    } else {
      setEmailError('')
    }
  }
  //  password event => 
  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value
    setPassword(inputPassword)
    if (!validatePassword(inputPassword)) {
      setPasswordError('Please enter the password')
    } else {
      setPasswordError('')
    }
  }

  let callbackUrl = searchParams.get('callbackUrl')
  if (callbackUrl) {
    try {
      const url = new URL(callbackUrl)
      if (url.origin != globalThis.location?.origin) {
        callbackUrl = ''
      }
    } catch (e) { }
    if (callbackUrl.indexOf('logout') > -1) {
      callbackUrl = ''
    }
  }

  callbackUrl = callbackUrl || '/'
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = data.get('email')
    const password = data.get('password')


    // loader settimeout 
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)


    if (email === '') {
      setEmailError(true)
    } else {
      setEmailError(false)
    }

    if (password === '') {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }


    const result = await signIn('credentials', {
      username,
      password,
      callbackUrl,
      redirect: false
    })

    const clientSession = await getSession()
    if (result && result.status == 200 && clientSession?.user?.token) {
      router.push(callbackUrl)
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <>
      <div className='authenticationBox'>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <img
              src='/images/loginPageImage.png'
              alt='loginScreenLeftSideImage'
            />
          </div>
          <div className={styles.rightContainer}>
            <div className='loginCardStyle'>
              <Box>
                <h1>Login Your account</h1>
                <Box component='form' noValidate onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      mb: '20px',
                      width: {
                        //resize box
                        xs: 340,
                        md: 370,
                        lg: 400,
                        xl: 500
                      }
                    }}
                  >
                    <Grid container alignItems='center' spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id='email'
                          label='Email Address'
                          name='email'
                          autoComplete='email'
                          InputProps={{
                            style: { borderRadius: 8 }
                          }}
                          onChange={handleEmailChange}
                          error={emailError || loginError}
                          helperText={
                            emailError
                              ? 'Enter the correct email address'
                              : loginError
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name='password'
                          label='Password'
                          type='password'
                          id='password'
                          autoComplete='new-password'
                          InputProps={{
                            style: { borderRadius: 8 }
                          }}

                          onChange={handlePasswordChange}
                          error={passwordError || loginError}
                          helperText={passwordError ? 'Please enter the password' : loginError
                          }
                        />
                      </Grid>
                    </Grid>
                    <span>
                      {error && (
                        <Typography
                          variant='body2'
                          color='error'
                          align='center'
                          sx={{ mb: 3 }}
                        >
                          {error}
                        </Typography>
                      )}</span>
                    <br />
                    <br />
                    <Grid container alignItems='center' spacing={2}>
                      <Grid item xs={5} sm={5} ml='20px'>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value='allowExtraEmails'
                              color='primary'
                            />
                          }
                          label='Remember me.'
                        />
                      </Grid>
                      <Grid item xs={5} sm={5} textAlign='end' ml='20px'>
                        <Link
                          href='/authentication/forgot-password'
                          className='primaryColor text-decoration-underline'
                          style={{}}
                        >
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                    <span>
                      {/* empty space*/}
                    </span>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{
                        mt: '20px',
                        textTransform: 'capitalize',
                        borderRadius:
                          '100px' /* Changed to 100px for circular button */,
                        fontWeight: '500',
                        fontSize: '16px',
                        padding:
                          '14px 0px 14px 0px' /* Adjust the padding as needed */,
                        color: '#fff !important',
                        background:
                          'linear-gradient(270deg, #02E1B9 0%, #00ACF6 100%)'
                      }}
                      disabled={
                        loading && email == '' && password == ''
                      }
                    >
                      {loading ? (
                        <CircularProgress size={26} color='inherit' />
                      ) : (
                        'Login'
                      )}
                    </Button>

                    <Typography fontSize='15px' mb='30px' mt='15px' ml='30px'>
                      Don't have an account?{' '}
                      <Link
                        href='/authentication/sign-up'
                        className='primaryColor text-decoration-underline'
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </Box>
                  <Typography
                    fontSize='12px'
                    mt='20%'
                    textAlign='center'
                    color='#676B5F'
                  >
                    2023 Copyrights. All Rights Reserved
                  </Typography>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
