export const initialData = {
  student: {
    name: "Osama Mahmoud",
    id: "2024001",
    department: "Information Systems",
    gpa: "3.85",
  },
  stats: {
    enrolledCourses: 5,
    pendingAssignments: 3,
    upcomingExams: 2,
  },
  todaySchedule: [
    { id: 1, subject: "Database Systems", time: "09:00 AM - 11:00 AM", hall: "Hall 4" },
    { id: 2, subject: "Web Development", time: "11:30 AM - 01:30 PM", hall: "Lab 2" },
  ],
  assignments: [
    { id: 1, title: "ERD Design Project", course: "Database Systems", dueDate: "2026-10-10", status: "Pending" },
    { id: 2, title: "React Dashboard UI", course: "Web Dev", dueDate: "2026-10-12", status: "Pending" },
    { id: 3, title: "SRS Documentation", course: "Software Engineering", dueDate: "2026-10-18", status: "Completed" },
  ],
  // 👈 قائمة المواد الدراسية اللي هتظهر في صفحة Courses
  coursesList: [
    {
      id: "CS301",
      title: "Database Management Systems",
      instructor: "Dr. Ahmed Hassan",
      credits: 3,
      progress: 75,
      code: "IS-301",
    },
    {
      id: "CS302",
      title: "Advanced Web Development",
      instructor: "Dr. Mona Aly",
      credits: 3,
      progress: 60,
      code: "IS-302",
    },
    {
      id: "CS303",
      title: "Software Engineering",
      instructor: "Dr. Khaled Omar",
      credits: 3,
      progress: 45,
      code: "IS-303",
    },
    {
      id: "CS304",
      title: "Data Structures & Algorithms",
      instructor: "Dr. Sarah Ibrahim",
      credits: 4,
      progress: 90,
      code: "CS-201",
    },
    {
      id: "CS305",
      title: "Computer Networks",
      instructor: "Dr. Mahmoud Youssef",
      credits: 3,
      progress: 30,
      code: "IT-202",
    }
  ]
};