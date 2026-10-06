import React, { useState } from 'react';
import { StickyNote, Plus, Trash2 } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Database ERD", content: "Remember to draw the M:N relationship between Student and Course." },
    { id: 2, title: "React State", content: "Use useState for dynamic inputs and forms." }
  ]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    setNotes([{ id: Date.now(), title, content }, ...notes]);
    setTitle('');
    setContent('');
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Study <span className="text-purple-400">Notes</span> 📑
        </h1>
        <p className="text-zinc-400 text-sm mt-1">Quick notes and study reminders.</p>
      </div>

      <form onSubmit={handleAdd} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-purple-400">Add Quick Note</h3>
        <input 
          type="text" 
          placeholder="Note Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500" 
          required 
        />
        <textarea 
          placeholder="Write your note here..." 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 h-24" 
          required 
        />
        <button type="submit" className="px-6 py-2 bg-purple-500 text-black font-bold rounded-xl text-sm hover:bg-purple-400 transition-all">
          Save Note
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/40 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-2">{note.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{note.content}</p>
            </div>
            <button 
              onClick={() => setNotes(notes.filter((n) => n.id !== note.id))} 
              className="mt-4 self-end text-zinc-500 hover:text-purple-400 p-1.5 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;