import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const uid = await storage.getItem('session:uid');
      if (!uid) {
        navigate('/login'); // Redirect to the auth page if not authenticated
        return;
      }
    };

    checkAuth();
  }, [navigate]);

  return <>{children}</>; // Render children if authenticated
};
