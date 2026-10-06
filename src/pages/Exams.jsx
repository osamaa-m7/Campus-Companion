import React, { useState } from 'react';
import { FileText, Calendar, Clock, MapPin, Plus, Trash2, CheckCircle2, Search, Filter } from 'lucide-react';

const Exams = () => {
  const [examsList, setExamsList] = useState([
    { id: 1, subject: "Database Systems", date: "2026-10-25", time: "10:00 AM", hall: "Hall 4", status: "Upcoming" },
    { id: 2, subject: "Web Development", date: "2026-10-28", time: "12:00 PM", hall: "Lab 2", status: "Upcoming" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hall, setHall] = useState('');

  // States للبحث والفلترة
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!subject || !date || !time) return;
    const newExam = { id: Date.now(), subject, date, time, hall: hall || 'Main Hall', status: 'Upcoming' };
    setExamsList([newExam, ...examsList]);
    setSubject(''); setDate(''); setTime(''); setHall(''); setShowForm(false);
  };

  const toggleStatus = (id) => {
    setExamsList(examsList.map(e => e.id === id ? { ...e, status: e.status === 'Upcoming' ? 'Completed' : 'Upcoming' } : e));
  };

  const handleDelete = (id) => {
    setExamsList(examsList.filter(e => e.id !== id));
  };

  // تصفية الامتحانات بناءً على البحث والفلترة
  const filteredExams = examsList.filter((exam) => {
    const matchesSearch = 
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.hall.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' || exam.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Upcoming <span className="text-rose-400">Exams</span> 📝</h1>
            <p className="text-zinc-400 text-sm mt-1">Manage and track your examination schedule.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-black font-bold rounded-xl text-sm hover:bg-rose-400 transition-all">
            <Plus size={18} /> {showForm ? 'Cancel' : 'Add Exam'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-rose-400">Add New Exam</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Subject Name" value={subject} onChange={e=>setSubject(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500" required />
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500" required />
            <input type="text" placeholder="Time (e.g. 10:00 AM)" value={time} onChange={e=>setTime(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500" required />
            <input type="text" placeholder="Hall / Location" value={hall} onChange={e=>setHall(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500" />
          </div>
          <button type="submit" className="px-6 py-2 bg-rose-500 text-black font-bold rounded-xl text-sm">Save Exam</button>
        </form>
      )}

      {/* شريط البحث والفلترة */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/80">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search by subject or hall..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={16} className="text-rose-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* قائمة الامتحانات */}
      <div className="space-y-4">
        {filteredExams.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 bg-zinc-900/30 rounded-2xl border border-zinc-800">
            No exams found matching your search.
          </div>
        ) : (
          filteredExams.map((exam) => (
            <div key={exam.id} className="bg-zinc-900/60 border border-zinc-800 hover:border-rose-500/40 p-5 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button onClick={() => toggleStatus(exam.id)} className={`p-3 rounded-xl border ${exam.status === 'Upcoming' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                  {exam.status === 'Upcoming' ? <FileText size={20} /> : <CheckCircle2 size={20} />}
                </button>
                <div>
                  <h3 className={`text-base font-bold ${exam.status === 'Completed' ? 'line-through text-zinc-500' : 'text-white'}`}>{exam.subject}</h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                    <span className="flex items-center gap-1"><Calendar size={13} className="text-rose-400" /> {exam.date}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {exam.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={13} /> {exam.hall}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => handleDelete(exam.id)} className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16} /></button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Exams;