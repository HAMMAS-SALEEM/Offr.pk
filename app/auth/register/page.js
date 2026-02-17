'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'

const schema = yup.object({
  name: yup
    .string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters'),
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

const Register = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    console.log('Registration Data:', data)
    const response = await fetch('/api/user',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
      const result = await response.json()
      console.log('User created:', result)
      alert('Registration successful! Redirecting to login...')
      router.push('/auth/login')
    } else {
        const errorData = await response.json()
        console.error('Error creating user:', errorData)
        alert(`Registration failed: ${errorData.error || 'Unknown error'}`)
    }
  }

  const redirectToLogin = () => router.push('/auth/login')

  return (
    <div className='max-w-md mx-auto p-6 flex flex-col h-screen justify-center gap-3'>
      <h2 className='text-2xl font-bold text-center mb-6'>Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <input
            type='text'
            placeholder='Full Name'
            {...register('name')}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <p className='text-red-500 text-sm mt-1'>
            {errors.name?.message}
          </p>
        </div>

        <div>
          <input
            type='text'
            placeholder='Username'
            {...register('username')}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <p className='text-red-500 text-sm mt-1'>
            {errors.username?.message}
          </p>
        </div>

        <div>
          <input
            type='email'
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
          Sign Up
        </button>
      </form>
      <button onClick={redirectToLogin} className='font-bold cursor-pointer'>
        Already have an account? Login
      </button>
    </div>
  )
}

export default Register
