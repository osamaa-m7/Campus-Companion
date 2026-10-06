import React, { useState, useEffect } from 'react';
import { User, Mail, GraduationCap, Save } from 'lucide-react';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Information Systems');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('studentName') || 'Osama Mahmoud';
    const savedEmail = localStorage.getItem('studentEmail') || 'osama@example.com';
    setName(savedName);
    setEmail(savedEmail);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('studentName', name);
    localStorage.setItem('studentEmail', email);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Student <span className="text-indigo-400">Profile</span> 👤</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your account credentials and personal details.</p>
      </div>

      <form onSubmit={handleSave} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 mb-1.5 flex items-center gap-2"><User size={14} /> Full Name</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500" required />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 mb-1.5 flex items-center gap-2"><Mail size={14} /> Email Address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500" required />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 mb-1.5 flex items-center gap-2"><GraduationCap size={14} /> Academic Department</label>
            <input type="text" value={department} onChange={e=>setDepartment(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500" required />
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 text-white font-bold rounded-xl text-sm hover:bg-indigo-400 transition-all">
          <Save size={16} /> {saved ? 'Saved Successfully!' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;