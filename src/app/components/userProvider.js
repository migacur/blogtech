'use client';
import { UserProvider } from '@/context/authContext';

export default function UserProviderClient({ children }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
