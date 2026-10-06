import React, { useState } from 'react';
import { Newspaper, Calendar, Plus, Trash2, Tag } from 'lucide-react';

const EventsNews = () => {
  const [items, setItems] = useState([
    { id: 1, title: "Tech Innovation Hackathon 2026", category: "Event", date: "2026-11-05", desc: "Annual coding and AI solution contest for university students." },
    { id: 2, title: "Final Exam Timetable Published", category: "News", date: "2026-10-10", desc: "Please check your academic portal for full schedule details." }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Event');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !desc) return;
    setItems([{ id: Date.now(), title, category, date: date || '2026-10-15', desc }, ...items]);
    setTitle(''); setDesc(''); setDate(''); setShowForm(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Events & <span className="text-emerald-400">News</span> 📢</h1>
            <p className="text-zinc-400 text-sm mt-1">Stay updated with campus announcements and activities.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl text-sm hover:bg-emerald-400 transition-all">
            <Plus size={18} /> {showForm ? 'Cancel' : 'Add Item'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-emerald-400">Add News or Event</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500" required />
            <select value={category} onChange={e=>setCategory(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none">
              <option value="Event">Event</option>
              <option value="News">News</option>
            </select>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
          <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500 h-20" required />
          <button type="submit" className="px-6 py-2 bg-emerald-500 text-black font-bold rounded-xl text-sm">Save</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/40 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${item.category === 'Event' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>{item.category}</span>
                <span className="text-xs text-zinc-500 flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
            <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="mt-4 self-end text-zinc-500 hover:text-emerald-400 p-1.5"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsNews;