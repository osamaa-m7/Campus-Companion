import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, Trash2 } from 'lucide-react';

const Schedule = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, day: "Sunday", subject: "Database Systems", time: "09:00 AM - 11:00 AM", hall: "Hall 4" },
    { id: 2, day: "Monday", subject: "Web Development", time: "11:30 AM - 01:30 PM", hall: "Lab 2" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [day, setDay] = useState('Sunday');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [hall, setHall] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!subject || !time) return;
    setSchedule([...schedule, { id: Date.now(), day, subject, time, hall: hall || 'Hall 1' }]);
    setSubject(''); setTime(''); setHall(''); setShowForm(false);
  };

  const handleDelete = (id) => {
    setSchedule(schedule.filter(s => s.id !== id));
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Class <span className="text-cyan-400">Schedule</span> 🗓️</h1>
            <p className="text-zinc-400 text-sm mt-1">Weekly lecture timetable and locations.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl text-sm hover:bg-cyan-400 transition-all">
            <Plus size={18} /> {showForm ? 'Cancel' : 'Add Class'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-cyan-400">Add Class to Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select value={day} onChange={e=>setDay(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'].map(d=><option key={d} value={d}>{d}</option>)}
            </select>
            <input type="text" placeholder="Subject Name" value={subject} onChange={e=>setSubject(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" required />
            <input type="text" placeholder="Time (e.g. 09:00 - 11:00)" value={time} onChange={e=>setTime(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" required />
            <input type="text" placeholder="Hall / Lab" value={hall} onChange={e=>setHall(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" />
          </div>
          <button type="submit" className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-xl text-sm">Save Class</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schedule.map((item) => (
          <div key={item.id} className="bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/40 p-5 rounded-2xl flex justify-between items-center">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">{item.day}</span>
              <h3 className="text-lg font-bold text-white mt-2">{item.subject}</h3>
              <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                <span className="flex items-center gap-1"><Clock size={13} className="text-cyan-400" /> {item.time}</span>
                <span className="flex items-center gap-1"><MapPin size={13} /> {item.hall}</span>
              </div>
            </div>
            <button onClick={() => handleDelete(item.id)} className="p-2 text-zinc-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;