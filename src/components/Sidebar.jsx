import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckSquare, 
  FileText, 
  Calendar, 
  StickyNote, 
  Newspaper, 
  Sparkles, 
  User,
  TrendingUp,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'Smart Generator', path: '/smart-generator', icon: Sparkles },
    { name: 'Assignments', path: '/assignments', icon: CheckSquare },
    { name: 'Exams', path: '/exams', icon: FileText },
    { name: 'Notes', path: '/notes', icon: StickyNote },
    { name: 'Events & News', path: '/events-news', icon: Newspaper },
    { name: 'Academic Progress', path: '/academic-progress', icon: TrendingUp },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800/80 p-4 flex flex-col justify-between hidden md:flex min-h-screen">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-black shadow-lg shadow-cyan-500/20">
            EDU
          </div>
          <span className="font-extrabold text-lg text-white tracking-wide">
            Campus<span className="text-cyan-400">Companion</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;