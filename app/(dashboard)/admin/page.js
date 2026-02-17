import { authOptions } from '@/app/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const Admin = () => {
  const session = getServerSession(authOptions)
  console.log(session)
  return (
    <div>
      WELCOME TO THE ADMIN DASHBOARD
    </div>
  )
}

export default Admin
