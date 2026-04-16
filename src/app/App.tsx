import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useEffect } from 'react';
import { fetchSkillCards } from '@/services/actions/skills';
import { AppRouter } from './routes/router';
import { selectUser } from '@/services/slices/authSlice';

export function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchSkillCards());
  }, [dispatch, user?.id]);

  return <AppRouter />;
}