import { useState } from 'react';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { auth } from '../../firebase';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
      return;
    }
  }, [user]);

  const handleLogin = async () => {
    setShowError(email === '' || password === '');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log('shohei - userCredential.user.uid', userCredential.user.uid);
      await storage.setItem('session:uid', userCredential.user.uid);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="w-[600px] h-[400px] pt-24">
      <div className="w-[256px] m-auto flex flex-col gap-3 justify-center items-center p-6 border-solid border-[1px] border-black rounded-md text-xs">
        <div>
          <input
            className="w-full h-[24px] px-3 focus:bg-yellow-200 border-solid border-[1px] border-black"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          {showError && email === '' && (
            <p className="text-red-600">Email is missing</p>
          )}
        </div>
        <div>
          <input
            className="w-full h-[24px] px-3 focus:bg-yellow-200 border-solid border-[1px] border-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          {showError && password === '' && (
            <p className="text-red-600">Password is missing</p>
          )}
        </div>
        <button
          className="bg-blue-600 px-3 py-1 rounded-md text-white mt-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};
