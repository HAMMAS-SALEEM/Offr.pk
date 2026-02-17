import { NextResponse } from 'next/server'
import { db } from '@/app/lib/db'
import { hash } from 'bcrypt'
import * as z from 'zod'


const userSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

export async function GET () {
  const allUsers = await db.user.findMany();
  return NextResponse.json({ users: allUsers }, { status: 200 });
}

export async function POST (req) {
  try {
    const body = await req.json()

    const { name, username, email, password } = userSchema.parse(body)
    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const existingUsername = await db.user.findUnique({
      where: { username: username }
    })

    if (existingUsername) {
      return NextResponse.json(
        {
          error: 'Username already exists'
        },
        { status: 409 }
      )
    }

    const existingEmail = await db.user.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return NextResponse.json(
        {
          error: 'Email already exists'
        },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 10)
    const newUser = await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword
      }
    })

    const { password: newUserPassword, ...userWithoutPassword } = newUser
    return NextResponse.json(
      {
        user: userWithoutPassword,
        message: 'User created successfully'
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({
        error: error.message,
    }, {status: 400})
  }
}
