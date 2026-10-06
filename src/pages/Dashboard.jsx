import React from 'react';
import { BookOpen, CheckSquare, FileText, TrendingUp, Clock, Calendar, Bell, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { title: "Active Courses", value: "6 Modules", icon: BookOpen, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
    { title: "Pending Tasks", value: "4 Assignments", icon: CheckSquare, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { title: "Upcoming Exams", value: "2 Exams", icon: FileText, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
    { title: "Average Score", value: "92.4%", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 md:p-8 shadow-xl">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Welcome Back, <span className="text-cyan-400">Osama</span> 👋
        </h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-xl">
          Here is your academic performance overview. You have 2 assignments due this week and 1 exam coming up.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400">{stat.title}</span>
                <div className={`p-2 rounded-xl border ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              <p className="text-xl font-black text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Courses Progress */}
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-cyan-400" /> Active Course Progress
            </h2>
            <Link to="/courses" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { name: "Web Development", code: "CS301", progress: 85, color: "bg-cyan-500" },
              { name: "Database Systems", code: "CS302", progress: 60, color: "bg-purple-500" },
              { name: "Software Engineering", code: "CS303", progress: 40, color: "bg-rose-500" }
            ].map(c => (
              <div key={c.code} className="bg-zinc-800/40 p-4 rounded-xl border border-zinc-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{c.name} <span className="text-zinc-500 ml-1">({c.code})</span></span>
                  <span className="text-zinc-400 font-mono">{c.progress}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications & Reminders */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell size={20} className="text-amber-400" /> Schedule Reminders
          </h2>

          <div className="space-y-3">
            {[
              { title: "React Project Submission", time: "Tomorrow at 11:59 PM", tag: "Assignment", type: "amber" },
              { title: "Database Midterm Exam", time: "Oct 12, 10:00 AM", tag: "Exam", type: "rose" },
              { title: "Hackathon Registration", time: "Oct 15, 05:00 PM", tag: "Event", type: "emerald" }
            ].map((item, i) => (
              <div key={i} className="p-3.5 bg-zinc-800/30 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{item.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.type === 'amber' ? 'bg-amber-500/10 text-amber-400' :
                    item.type === 'rose' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {item.tag}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 flex items-center gap-1">
                  <Clock size={12} /> {item.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;