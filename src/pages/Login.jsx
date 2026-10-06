import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, GraduationCap, Lock, Mail, User } from 'lucide-react';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validation بسيط
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أرقام/حروف على الأقل');
      return;
    }

    // حفظ بيانات الطالب الفعلية
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('studentName', name || 'Osama Mahmoud');
    localStorage.setItem('studentEmail', email);

    setError('');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-3">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-2xl font-black">Campus Companion</h1>
          <p className="text-xs text-zinc-400">Student Portal Sign In</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 mb-1 flex items-center gap-2"><User size={14} /> Full Name</label>
            <input 
              type="text" 
              placeholder="Osama Mahmoud" 
              value={name} 
              onChange={e=>setName(e.target.value)} 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" 
              required 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 mb-1 flex items-center gap-2"><Mail size={14} /> Student Email</label>
            <input 
              type="email" 
              placeholder="student@helwan.edu.eg" 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" 
              required 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 mb-1 flex items-center gap-2"><Lock size={14} /> Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" 
              required 
            />
          </div>

          <button type="submit" className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl text-sm hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
            <LogIn size={18} /> Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;