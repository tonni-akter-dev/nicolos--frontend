

'use client'


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from './auth';

const RequireAuth = (WrappedComponent) => {

  const Wrapper = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined' && !loading && !user) {
        router.push('/');
      }
    }, [loading, user, router]);
    return <>{user ? <WrappedComponent {...props} /> : null}</>;
  };

  return Wrapper;
};

export default RequireAuth;
