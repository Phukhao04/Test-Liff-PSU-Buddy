import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Context from '@/contexts/Context';
import { FaHome, FaThLarge, FaSignOutAlt } from 'react-icons/fa';
import useHaptic from '@/hooks/useHaptic';

const navItems = [
  { key: '/home', icon: <FaHome size={20} />,    label: 'Home' },
  { key: '/menu', icon: <FaThLarge size={20} />, label: 'Menu' },
];

const Footer = () => {
  const { liff, character } = useContext(Context);
  const navigate  = useNavigate();
  const location  = useLocation();
  const haptic    = useHaptic();

  const primary = character?.color ?? '#4986FF';

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-sm -translate-x-1/2">
      <div className="flex items-center justify-between rounded-[28px] bg-white px-5 py-4 shadow-[0_12px_30px_rgba(0,60,113,0.35)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                haptic.medium();
                navigate(item.key);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full transition"
              style={{
                backgroundColor: isActive ? primary : 'transparent',
                color: isActive ? '#fff' : '#9ca3af',
              }}
            >
              {item.icon}
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={() => {
            haptic.heavy();
            if (liff?.isLoggedIn?.()) {
              liff.logout();
              window.location.reload();
            }
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Footer;