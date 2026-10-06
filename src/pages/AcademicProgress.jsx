import React from 'react';
import { Award, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';

const AcademicProgress = () => {
  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Academic <span className="text-rose-400">Progress</span> 📈</h1>
        <p className="text-zinc-400 text-sm mt-1">Track your overall GPA, completed credit hours, and degree milestones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-2">
          <p className="text-xs text-zinc-400 font-bold">Cumulative GPA</p>
          <p className="text-3xl font-black text-rose-400">3.82 / 4.0</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1"><TrendingUp size={12} /> Excellent Performance</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-2">
          <p className="text-xs text-zinc-400 font-bold">Completed Credit Hours</p>
          <p className="text-3xl font-black text-white">84 / 120</p>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-rose-500 w-[70%]" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-2">
          <p className="text-xs text-zinc-400 font-bold">Academic Status</p>
          <p className="text-2xl font-black text-emerald-400 flex items-center gap-2"><CheckCircle size={22} /> Honor List</p>
          <p className="text-[11px] text-zinc-500">Senior Year Student</p>
        </div>
      </div>
    </div>
  );
};

export default AcademicProgress;