import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-change-me');
export async function setSession(studentId: string) {
  const token = await new SignJWT({ studentId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('8h').sign(secret);
  (await cookies()).set('tcas_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60*60*8 });
}
export async function getSession() {
  const token = (await cookies()).get('tcas_session')?.value;
  if (!token) return null;
  try { return (await jwtVerify(token, secret)).payload as { studentId: string }; } catch { return null; }
}
export async function clearSession() { (await cookies()).delete('tcas_session'); }
