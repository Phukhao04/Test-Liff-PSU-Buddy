import React from "react";

const FrostedGlassCard = () => {
  return (
    <div
      className="relative z-10 p-6 max-w-sm w-full bg-white/10 backdrop-blur-[2px] rounded-2xl border border-white/10 
      before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/20 "
    >
      <h2 className="text-lg font-bold text-white mb-2">Frosted Class Card</h2>
      <p className="text-sm text-white/80">
        This is a frosted glass effect card. It uses a semi-transparent background and a backdrop blur to create the frosted look.
      </p>
    </div>
  );
};

export default FrostedGlassCard;