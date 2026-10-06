import React from 'react';
import { Search, Bell } from 'lucide-react';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="h-16 bg-zinc-950 border-b border-zinc-800/80 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar */}
      <div className="relative w-80 group">
        <Search 
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" 
          size={17} 
        />
        <input
          type="text"
          placeholder="Search courses, assignments, events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-900/80 text-zinc-100 placeholder-zinc-500 text-sm rounded-xl pl-10 pr-4 py-2 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-all"
        />
      </div>

      {/* Notifications & Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all border border-transparent hover:border-zinc-800">
          <Bell size={19} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        </button>

        <div className="h-5 w-px bg-zinc-800"></div>

        <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 rounded-xl">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-zinc-200 leading-tight">Osama Mahmoud</p>
            <p className="text-[10px] text-zinc-500 font-medium">Information Systems</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
            OM
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;