import { useAppDispatch } from '@/services/hooks';
import { useEffect } from 'react';
import { fetchSkillCards } from '@/services/actions/skills';
import { AppRouter } from './routes/router';

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSkillCards());
  }, [dispatch]);

  return <AppRouter />;
}