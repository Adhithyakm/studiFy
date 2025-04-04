import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    return (await jwtVerify(token, secret)).payload;
  } catch {
    return null;
  }
}