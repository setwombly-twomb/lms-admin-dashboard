export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Instructor' | 'Learner';
  status: 'Active' | 'Inactive';
  groups: string[];
  lastActive: string;
  avatar?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'Published' | 'Draft';
  enrolledUsers: number;
  createdDate: string;
  thumbnail?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdDate: string;
  members: string[];
}

export interface Attribute {
  id: string;
  name: string;
  type: 'Text' | 'Number' | 'Date' | 'Select';
  appliedTo: 'User' | 'Course';
  required: boolean;
  options?: string[];
}

export interface QuizMetric {
  id: string;
  quizName: string;
  courseName: string;
  attempts: number;
  avgScore: number;
  passRate: number;
  userIds: string[];
}

export interface LessonMetric {
  id: string;
  lessonName: string;
  courseName: string;
  views: number;
  completionRate: number;
  avgTimeMinutes: number;
  userIds: string[];
}

export interface KpiData {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
}

export interface EnrollmentData {
  day: string;
  enrollments: number;
}

export interface ScoreTrend {
  date: string;
  score: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

export interface ScoreDistribution {
  range: string;
  count: number;
}

export interface PassRateTrend {
  month: string;
  rate: number;
}

export interface CompletionTrend {
  month: string;
  rate: number;
}

export interface TimePerLesson {
  lesson: string;
  minutes: number;
}

export interface CsvRow {
  [key: string]: string;
}

export interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export interface LearnerAssignment {
  id: string;
  title: string;
  type: 'folder' | 'course' | 'lesson' | 'quiz' | 'tasklist';
  courseName: string;
  status: 'in_progress' | 'not_started' | 'completed';
  progress: number;
  assignedDate: string;
  dueDate: string | null;
  estimatedMinutes: number;
}

export interface CohortMember {
  id: string;
  name: string;
  email: string;
  completionPct: number;
  quizAvgScore: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  lastActiveDate: string;
  courseBreakdown: {
    courseName: string;
    completion: number;
    quizScore: number | null;
  }[];
}
