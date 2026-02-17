'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
})

const Login = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const signedInData = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (signedInData?.error) {
      console.log('Login failed:', signedInData.error)
    } else {
      router.push('/admin')
    }
  }

  const redirectToSignUp = () => router.push('/auth/register')

  return (
    <div className='max-w-md mx-auto p-6 flex flex-col h-screen justify-center gap-3'>
      <h2 className='text-2xl font-bold text-center mb-6'>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <input
            placeholder='Email'
            {...register('email')}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <p className='text-red-500 text-sm mt-1'>{errors.email?.message}</p>
        </div>

        <div>
          <input
            type='password'
            placeholder='Password'
            {...register('password')}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <p className='text-red-500 text-sm mt-1'>
            {errors.password?.message}
          </p>
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'
        >
          Login
        </button>
      </form>
      <button onClick={redirectToSignUp} className='font-bold cursor-pointer'>
        Don't have an account? Sign Up
      </button>
    </div>
  )
}

export default Login
