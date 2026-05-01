import { motion } from 'motion/react';

const MenuButton = ({ onClick, icon, children }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        relative overflow-hidden w-full max-w-md p-6 rounded-3xl shadow-xl border-none
        flex items-center justify-center
        transition-all duration-300 cursor-pointer
        bg-white text-psu-deep-blue-500
        hover:shadow-2xl hover:brightness-110
        active:scale-95 active:brightness-90
      "
    >
      {icon && (
        <span
          className="absolute -right-4 top-1/2 -translate-y-1/2 text-8xl opacity-40 pointer-events-none select-none rotate-12"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="relative z-10 text-lg text-psu-deep-blue-500 font-semibold w-full text-center drop-shadow-md">
        {children}
      </span>
    </motion.button>
  );
};

export default MenuButton;