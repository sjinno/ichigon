import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router';

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.removeItem('session:uid');
    signOut(auth);
    navigate('/login');
  };

  return (
    <button
      className="bg-zinc-200 px-2 py-[3px] rounded-md text-xs"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};
