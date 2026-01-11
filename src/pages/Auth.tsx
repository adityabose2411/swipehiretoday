import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately redirect to discover page
    navigate('/discover');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse">
        <img src={logo} alt="SwipeHire" className="w-24 h-24" />
      </div>
    </div>
  );
};

export default Auth;
