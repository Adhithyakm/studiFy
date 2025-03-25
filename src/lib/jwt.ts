import jwt from 'jsonwebtoken'

interface TokenPayload {
  userId: number
  email: string
}

export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
}