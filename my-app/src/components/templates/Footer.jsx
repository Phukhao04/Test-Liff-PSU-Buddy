import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Context from '@/contexts/Context';
import { FaHome, FaThLarge, FaUser, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { key: '/',       icon: <FaHome size={20} />,       label: 'Home' },
  { key: '/menu',   icon: <FaThLarge size={20} />,    label: 'Menu' },
  { key: '/profile',icon: <FaUser size={20} />,       label: 'Profile' },
];

const Footer = () => {
  const { liff } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-sm -translate-x-1/2">
      <div className="flex items-center justify-between rounded-[28px] bg-psu-deep-blue-500 px-5 py-4 shadow-[0_12px_30px_rgba(0,60,113,0.35)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.key;
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                isActive ? 'bg-white text-psu-deep-blue-500' : 'text-white/85'
              }`}
            >
              {item.icon}
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={() => {
            if (liff?.isLoggedIn?.()) {
              liff.logout();
              window.location.reload();
            }
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Footer;