import React, { useState } from 'react';
import { Clock, CheckCircle2, Calendar, BookOpen, Plus, Trash2, Search } from 'lucide-react';
import { initialData } from '../data/mockData';

const Assignments = () => {
  // جعل القائمة ديناميكية قابلة للتعديل والزيادة والنقصان
  const [assignmentsList, setAssignmentsList] = useState(initialData.assignments || []);
  const [filter, setFilter] = useState('All');

  // State للبحث
  const [searchQuery, setSearchQuery] = useState('');

  // State للنموذج الخاص بإضافة واجب جديد
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  // 1️⃣ دالة إضافة واجب جديد
  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!newTitle || !newCourse || !newDueDate) return;

    const newItem = {
      id: Date.now(), // ID فريد
      title: newTitle,
      course: newCourse,
      dueDate: newDueDate,
      status: 'Pending'
    };

    setAssignmentsList([newItem, ...assignmentsList]);
    
    // إعادة تفريغ الحقول وإغلاق النموذج
    setNewTitle('');
    setNewCourse('');
    setNewDueDate('');
    setShowAddForm(false);
  };

  // 2️⃣ دالة تبديل حالة الواجب (تكتمل / معلقة)
  const toggleStatus = (id) => {
    setAssignmentsList(
      assignmentsList.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Pending' ? 'Completed' : 'Pending' }
          : item
      )
    );
  };

  // 3️⃣ دالة حذف واجب (تنقيص)
  const handleDelete = (id) => {
    setAssignmentsList(assignmentsList.filter((item) => item.id !== id));
  };

  // فلترة العناصر المعروضة بناءً على الحالة والبحث
  const filteredAssignments = assignmentsList.filter((item) => {
    // 1. التصفية حسب حالة الواجب (Pending / Completed / All)
    const matchesFilter =
      filter === 'All' ? true :
      filter === 'Pending' ? item.status === 'Pending' :
      item.status === 'Completed';

    // 2. التصفية حسب البحث (العنوان أو الكورس)
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Assignments & <span className="text-amber-400">Tasks</span> 📝
            </h1>
            <p className="text-zinc-400 text-sm mt-1.5 max-w-lg">
              Manage your tasks, add new assignments, and change completion status freely.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* زر فتح نموذج الإضافة */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-bold rounded-xl text-sm hover:bg-amber-400 transition-all shadow-md"
            >
              <Plus size={18} />
              {showAddForm ? 'Cancel' : 'Add Assignment'}
            </button>

            {/* الفلترة */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-xl border border-zinc-800">
              {['All', 'Pending', 'Completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filter === tab
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* شريط البحث (Search Bar) */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input
          type="text"
          placeholder="Search assignment or course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-all"
        />
      </div>

      {/* نموذج الإضافة الديناميكي */}
      {showAddForm && (
        <form onSubmit={handleAddAssignment} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-amber-400">Add New Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Assignment Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              required
            />
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              required
            />
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-sm transition-all"
          >
            Save Assignment
          </button>
        </form>
      )}

      {/* قائمة الواجبات والتاسكات */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 bg-zinc-900/30 rounded-2xl border border-zinc-800">
            No assignments found matching your search.
          </div>
        ) : (
          filteredAssignments.map((item) => {
            const isPending = item.status === 'Pending';

            return (
              <div 
                key={item.id}
                className="group bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/90 hover:border-amber-500/40 p-5 rounded-2xl transition-all duration-300 flex flex-col md:flex-row justify-between md:items-center gap-4 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    title="Click to toggle status"
                    className={`p-3 rounded-xl border mt-0.5 transition-all ${
                      isPending 
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20' 
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    {isPending ? <Clock size={20} /> : <CheckCircle2 size={20} />}
                  </button>

                  <div className="space-y-1">
                    <h3 className={`text-base font-bold transition-colors ${!isPending ? 'line-through text-zinc-500' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1 font-medium text-zinc-300">
                        <BookOpen size={14} className="text-amber-400" /> {item.course}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono text-zinc-400">
                        <Calendar size={14} /> Due: {item.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 border-zinc-800/80 pt-3 md:pt-0">
                  {/* تغيير الحالة عند الضغط */}
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                      isPending
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                    }`}
                  >
                    {item.status}
                  </button>

                  {/* زر حذف التاسك */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Delete Assignment"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Assignments;