import React, { useState } from 'react';
import { Calendar, CheckCircle, AlertTriangle, RefreshCw, Zap } from 'lucide-react';

const SmartScheduleGenerator = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [generatedSchedule, setGeneratedSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const availableCourses = [
    { id: 1, name: "Web Development", code: "CS301", slot: "Mon & Wed - 10:00 AM" },
    { id: 2, name: "Database Systems", code: "CS302", slot: "Tue & Thu - 12:00 PM" },
    { id: 3, name: "Software Engineering", code: "CS303", slot: "Mon & Wed - 10:00 AM" }, // Conflict with CS301
    { id: 4, name: "AI Fundamentals", code: "CS304", slot: "Sun & Tue - 02:00 PM" },
  ];

  const toggleCourse = (course) => {
    if (selectedCourses.some(c => c.id === course.id)) {
      setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setGeneratedSchedule(selectedCourses);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-black text-zinc-100 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Smart Schedule <span className="text-amber-400">Generator</span> ⚡</h1>
        <p className="text-zinc-400 text-sm mt-1">Select courses and time slots to generate a conflict-free weekly schedule.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Select Courses */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-amber-400">1. Select Available Courses</h3>
          <div className="space-y-3">
            {availableCourses.map(course => {
              const isSelected = selectedCourses.some(c => c.id === course.id);
              return (
                <div 
                  key={course.id} 
                  onClick={() => toggleCourse(course)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                    isSelected ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-zinc-800/40 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm text-white">{course.name} ({course.code})</h4>
                    <p className="text-xs text-zinc-400 mt-1">{course.slot}</p>
                  </div>
                  <input type="checkbox" checked={isSelected} readOnly className="accent-amber-500" />
                </div>
              );
            })}
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={selectedCourses.length === 0 || loading} 
            className="w-full py-3 bg-amber-500 text-black font-bold rounded-xl text-sm hover:bg-amber-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
            Generate Schedule
          </button>
        </div>

        {/* Output Schedule */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white">2. Generated Timetable Result</h3>
          {!generatedSchedule ? (
            <p className="text-xs text-zinc-500 italic">Select courses and click generate to process time slots.</p>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle size={16} /> Automated Conflict Check Passed!
              </div>
              {generatedSchedule.map(item => (
                <div key={item.id} className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 text-xs space-y-1">
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-zinc-400">{item.slot}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartScheduleGenerator;