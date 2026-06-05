import { useState, useEffect } from 'react';

import Axios from '../config/Axios';
import Context from './Context';

import liff from '@line/liff';

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [theUser, setTheUser] = useState(null);
  const [lineUser, setLineUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthDone, setAuthDone] = useState(false);
  const [isLiffError, setLiffError] = useState(false);

  const [language, setLanguage] = useState('th');

  useEffect(() => {
    getLanguage();
  }, []);

  useEffect(() => {
    auth();
  }, [token]);

  useEffect(() => {
    liff_function();
    liff.ready.then(async () => {
      // console.log('liff_ready');
      try {
        // console.log(liff.isLoggedIn());

        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          const getIdToken = liff.getIDToken();

          // throw new Error('Test liff error handling');
          const myres = await Axios.post(
            'liff/verify',
            {
              idToken: getIdToken,
            },
            {
              validateStatus: false,
            },
          );
          if (myres.status === 200) {
            setToken(() => {
              return myres.data;
            });
          } else if (myres.status === 401) {
            liff.logout();
            liff.login({
              redirectUri: import.meta.env.VITE_frontUrl_DEV,
            });
            return;
          } else {
            // console.log(myres);
            setAuthDone(true);
          }

          setLineUser(profile);

          // setAuthDone(true);
        } else {
          liff.login({
            redirectUri: import.meta.env.VITE_frontUrl_DEV,
          });
        }
      } catch (error) {
        console.error('Error during LIFF authentication:', error);
        setLiffError(true);
        setAuthDone(true);
      }
    });
  }, []);

  const liff_function = async () => {
    await liff
      .init({
        liffId:
          import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_LIFF_PROD_ID
            : import.meta.env.VITE_LIFF_DEV_ID,
      })
      .catch((err) => {
        console.error('LIFF Initialization failed', err);
        setLiffError(true);
        setAuthDone(true);
      });
  };

  const auth = async () => {
    if (!token) {
      return;
    }
    Axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data: user } = await Axios.post('/liff/auth', {
      validateStatus: false,
    });
    if (!user) {
      liff.logout();
      return;
    }
    setIsAuth(true);
    setAuthDone(true);
    setTheUser(user);
  };

  const getLanguage = () => {
    const key = `${import.meta.env.VITE_basename}-language`;
    const lang = localStorage.getItem(key);
    if (!lang) localStorage.setItem(key, language);
    setLanguage(lang || language);
  };

  const switchLanguage = () => {
    const newLanguage = language === 'en' ? 'th' : 'en';
    localStorage.setItem(`${import.meta.env.VITE_basename}-language`, newLanguage);
    setLanguage(newLanguage);
  };

  const [character, setCharacter] = useState(() => {
    try {
      const saved = localStorage.getItem('character');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  useEffect(() => {
    if (character) {
      localStorage.setItem('character', JSON.stringify(character));
    }
  }, [character]);

  const contextValue = {
    token,
    setToken,
    theUser,
    setTheUser,
    isAuth,
    setIsAuth,
    isAuthDone,
    setAuthDone,
    language,
    setLanguage,
    liff,
    lineUser,
    switchLanguage,
    isLiffError,
    character,
    setCharacter,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
export default ContextProvider;