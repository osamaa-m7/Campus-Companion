import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Edit3, User, Clock, CheckCircle, BarChart3, Search, Filter } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Web Development", code: "CS301", instructor: "Dr. Ahmed Hassan", progress: 85, color: "from-cyan-500 to-blue-600" },
    { id: 2, name: "Database Systems", code: "CS302", instructor: "Dr. Mona Ali", progress: 60, color: "from-purple-500 to-indigo-600" },
    { id: 3, name: "Software Engineering", code: "CS303", instructor: "Dr. Sayed Omar", progress: 40, color: "from-pink-500 to-rose-600" }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [instructor, setInstructor] = useState('');
  const [progress, setProgress] = useState(50);

  // States للبحث والفلترة
  const [searchQuery, setSearchQuery] = useState('');
  const [progressFilter, setProgressFilter] = useState('all');

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!name || !code) return;

    const colors = [
      "from-cyan-500 to-blue-600",
      "from-purple-500 to-indigo-600",
      "from-pink-500 to-rose-600",
      "from-emerald-500 to-teal-600",
      "from-amber-500 to-orange-600"
    ];

    const newCourse = {
      id: Date.now(),
      name,
      code,
      instructor: instructor || 'Dr. Assigned Instructor',
      progress: Number(progress),
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setCourses([newCourse, ...courses]);
    setName('');
    setCode('');
    setInstructor('');
    setProgress(50);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // منطق تصفية الكورسات بناءً على البحث والفلترة
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (progressFilter === 'completed') {
      matchesFilter = course.progress === 100;
    } else if (progressFilter === 'in-progress') {
      matchesFilter = course.progress > 0 && course.progress < 100;
    } else if (progressFilter === 'not-started') {
      matchesFilter = course.progress === 0;
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Academic <span className="text-cyan-400">Courses</span> 📚</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage and track your enrolled modules for this semester.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-black font-bold rounded-xl text-sm hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
        >
          <Plus size={18} /> {showForm ? 'Cancel' : 'Add New Course'}
        </button>
      </div>

      {/* Add Course Form */}
      {showForm && (
        <form onSubmit={handleAddCourse} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-cyan-400">Add Course Module</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              placeholder="Course Name (e.g. Artificial Intelligence)" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" 
              required 
            />
            <input 
              type="text" 
              placeholder="Course Code (e.g. CS401)" 
              value={code} 
              onChange={e => setCode(e.target.value)} 
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" 
              required 
            />
            <input 
              type="text" 
              placeholder="Instructor Name" 
              value={instructor} 
              onChange={e => setInstructor(e.target.value)} 
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" 
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400 font-bold mb-1 block">Progress ({progress}%)</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress} 
              onChange={e => setProgress(e.target.value)} 
              className="w-full accent-cyan-500 bg-zinc-800 h-2 rounded-lg cursor-pointer" 
            />
          </div>
          <button type="submit" className="px-6 py-2.5 bg-cyan-500 text-black font-bold rounded-xl text-sm hover:bg-cyan-400 transition-all">
            Save Course
          </button>
        </form>
      )}

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/80">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, code, or instructor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={16} className="text-cyan-400" />
          <select
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value)}
            className="w-full sm:w-auto bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Progress Levels</option>
            <option value="in-progress">In Progress (&gt;0% and &lt;100%)</option>
            <option value="completed">Completed (100%)</option>
            <option value="not-started">Not Started (0%)</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 p-6 rounded-2xl flex flex-col justify-between space-y-6 transition-all hover:scale-[1.01]">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 bg-zinc-800 text-cyan-400 rounded-lg border border-zinc-700">
                    {course.code}
                  </span>
                  <button onClick={() => handleDelete(course.id)} className="text-zinc-500 hover:text-red-400 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
                <h2 className="text-lg font-bold text-white mb-2">{course.name}</h2>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <User size={14} className="text-zinc-500" /> {course.instructor}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Completion</span>
                  <span className="font-bold text-white">{course.progress}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${course.color} rounded-full transition-all duration-500`} 
                    style={{ width: `${course.progress}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-zinc-900/30 rounded-2xl border border-zinc-800/50">
          <p className="text-zinc-400 text-sm">No courses found matching your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;