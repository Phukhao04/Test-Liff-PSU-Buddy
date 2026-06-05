import { useState, useEffect } from 'react';
import Axios from '../config/Axios';
import Context from './Context';
import liff from '@line/liff';

const IS_LOCAL = window.location.hostname === 'localhost';

const ContextProvider = ({ children }) => {
  const [token,       setToken]    = useState(null);
  const [theUser,     setTheUser]  = useState(null);
  const [lineUser,    setLineUser] = useState(null);
  const [isAuth,      setIsAuth]   = useState(false);
  const [isAuthDone,  setAuthDone] = useState(false);
  const [isLiffError, setLiffError]= useState(false);
  const [language,    setLanguage] = useState('th');

  const [character, setCharacter] = useState(() => {
    try {
      const saved = localStorage.getItem('character');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  useEffect(() => { getLanguage(); }, []);

  useEffect(() => {
    if (character) localStorage.setItem('character', JSON.stringify(character));
  }, [character]);

  // ── LIFF / Mock init ───────────────────────────────────────────
  useEffect(() => {
    const initAuth = async () => {
      try {
        // ── DEV localhost: ข้าม LIFF init ────────────────────────
        if (IS_LOCAL) {
          console.log('DEV MODE: skip LIFF init');
          const myres = await Axios.post(
            'liff/verify',
            { idToken: 'mock' },
            { validateStatus: false },
          );
          if (myres.status === 200) {
            setToken(myres.data);
          } else {
            setAuthDone(true);
          }
          return;
        }

        // ── LIFF จริง ────────────────────────────────────────────
        await liff.init({
          liffId: import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_LIFF_PROD_ID
            : import.meta.env.VITE_LIFF_DEV_ID,
        });

        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location.href });
          return;
        }

        const profile    = await liff.getProfile();
        const getIdToken = liff.getIDToken();

        const myres = await Axios.post(
          'liff/verify',
          { idToken: getIdToken },
          { validateStatus: false },
        );

        if (myres.status === 200) {
          setToken(myres.data);
        } else if (myres.status === 401) {
          liff.logout();
          liff.login({ redirectUri: window.location.href });
          return;
        } else {
          setAuthDone(true);
        }

        setLineUser(profile);

      } catch (error) {
        console.error('LIFF error:', error);
        setLiffError(true);
        setAuthDone(true);
      }
    };

    initAuth();
  }, []);

  // ── auth หลังได้ token ─────────────────────────────────────────
  useEffect(() => {
    if (!token) return;

    const auth = async () => {
      try {
        Axios.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await Axios.post('/liff/auth', {
          validateStatus: false,
        });
        if (!user) {
          if (!IS_LOCAL) liff.logout();
          return;
        }
        setIsAuth(true);
        setAuthDone(true);
        setTheUser(user);
      } catch (error) {
        console.error('Auth error:', error);
        setLiffError(true);
        setAuthDone(true);
      }
    };

    auth();
  }, [token]);

  const getLanguage = () => {
    const key  = `${import.meta.env.VITE_basename}-language`;
    const lang = localStorage.getItem(key);
    if (!lang) localStorage.setItem(key, language);
    setLanguage(lang || language);
  };

  const switchLanguage = () => {
    const newLanguage = language === 'en' ? 'th' : 'en';
    localStorage.setItem(`${import.meta.env.VITE_basename}-language`, newLanguage);
    setLanguage(newLanguage);
  };

  const contextValue = {
    token, setToken,
    theUser, setTheUser,
    isAuth, setIsAuth,
    isAuthDone, setAuthDone,
    language, setLanguage,
    liff, lineUser,
    switchLanguage,
    isLiffError,
    character, setCharacter,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;