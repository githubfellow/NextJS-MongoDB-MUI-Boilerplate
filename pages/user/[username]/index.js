import UserPageView from './UserPageView';
import { useEffect, useState } from 'react';
import { fetcher } from '@/src/common/utils/fetch';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function UserPage() {
  const [user, setUser] = useState({});
  const { query } = useRouter();
  const { data, isLoading } = useSWR('/api/user', fetcher);

  useEffect(() => {
    if (!isLoading) {
      if (!data?.user) {
        fetcher(`/api/user?publicUserData=${query.username}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
          .then((user) => {
            setUser(user);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } else {
        setUser(data.user);
      }
    }
  }, [isLoading]);

  if (isLoading) return null;

  return <UserPageView user={user} />;
}
