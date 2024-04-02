import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import storage from '../utils/storage';
import { useAppSelector } from '../hooks';
import { RootState } from '../redux/store';

interface ProtectedProps {
  children: React.ReactNode;
  authentication?: boolean;
}

function Protected({ children, authentication = true }: ProtectedProps) {
  // const authStatus = useSelector((state: any) => state.auth.status);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.user.isAuthenticated
    );
    console.log("in protected: ",isAuthenticated);
  
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (authentication !== isAuthenticated) {
        if (authentication) {
          navigate("/login");
        } else {
          navigate("/");
        }
      }
      setLoader(false);
    };

    checkAuthentication();
  }, [isAuthenticated, authentication, navigate]);

  return loader ? <div>Loading...</div> : <>{children}</>;
}

export default Protected;