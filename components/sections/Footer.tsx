import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] text-white/20 font-mono uppercase tracking-widest">
        <span>Dark Matter Archive</span>
        <span>System Status: Observer</span>
      </div>
    </footer>
  );
};

export default Footer;
