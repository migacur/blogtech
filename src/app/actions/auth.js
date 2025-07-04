// app/actions/auth.js
'use server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function getUserId() {
  const token = cookies().get('myToken')?.value;
  
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    
    return payload.userId;
  } catch (error) {
    return null;
  }
}