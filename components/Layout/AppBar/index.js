import React, { useCallback } from 'react';
import AppbarView from './AppbarView';
import { useCurrentUser } from '@/lib/user';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Appbar = () => {
  const router = useRouter();
  const { data: { user } = {}, mutate } = useCurrentUser();

  const userSettings = [
    { name: 'Profile', url: `/user/${user?.username}` },
    { name: 'Settings', url: '/settings' }
  ];

  const authenticatedLinks = [
    { name: 'Authenticated Page1', url: '/', order: 1 },
    { name: 'Authenticated Page2', url: '/', order: 2 },
    { name: 'Authenticated Page3', url: '/', order: 3 }
  ];

  const authLinks = [
    { name: 'Login', url: '/login', variant: 'outlined' },
    { name: 'Sign Up', url: '/sign-up', variant: 'contained' }
  ];

  const onSignOut = useCallback(async () => {
    try {
      await fetcher('/api/auth', {
        method: 'DELETE'
      });
      toast.success('You have been signed out');
      mutate({ user: null });
      router.replace('/login');
    } catch (e) {
      toast.error(e.message);
    }
  }, [mutate]);

  return (
    <AppbarView
      authLinks={authLinks}
      userSettings={userSettings}
      authenticatedLinks={authenticatedLinks}
      user={user}
      mutate={mutate}
      onSignOut={onSignOut}
    />
  );
};

export default Appbar;
