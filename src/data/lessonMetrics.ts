import type { LessonMetric, CompletionTrend, TimePerLesson } from '../types';

export const mockLessonMetrics: LessonMetric[] = [
  { id: '1', lessonName: 'Intro to Components', courseName: 'React Fundamentals', views: 456, completionRate: 92, avgTimeMinutes: 18 },
  { id: '2', lessonName: 'State & Props', courseName: 'React Fundamentals', views: 423, completionRate: 87, avgTimeMinutes: 25 },
  { id: '3', lessonName: 'useEffect Deep Dive', courseName: 'React Fundamentals', views: 389, completionRate: 78, avgTimeMinutes: 32 },
  { id: '4', lessonName: 'Type Inference', courseName: 'Advanced TypeScript', views: 267, completionRate: 85, avgTimeMinutes: 20 },
  { id: '5', lessonName: 'Advanced Generics', courseName: 'Advanced TypeScript', views: 234, completionRate: 65, avgTimeMinutes: 40 },
  { id: '6', lessonName: 'Design Thinking', courseName: 'UX Design Principles', views: 198, completionRate: 90, avgTimeMinutes: 22 },
  { id: '7', lessonName: 'User Research Methods', courseName: 'UX Design Principles', views: 176, completionRate: 88, avgTimeMinutes: 28 },
  { id: '8', lessonName: 'Scrum Framework', courseName: 'Project Management', views: 345, completionRate: 82, avgTimeMinutes: 15 },
  { id: '9', lessonName: 'Network Security', courseName: 'Cybersecurity Basics', views: 156, completionRate: 75, avgTimeMinutes: 35 },
  { id: '10', lessonName: 'AWS EC2 & S3', courseName: 'Cloud Architecture', views: 289, completionRate: 80, avgTimeMinutes: 30 },
];

export const completionTrend: CompletionTrend[] = [
  { month: 'Jul', rate: 72 },
  { month: 'Aug', rate: 75 },
  { month: 'Sep', rate: 78 },
  { month: 'Oct', rate: 76 },
  { month: 'Nov', rate: 80 },
  { month: 'Dec', rate: 83 },
  { month: 'Jan', rate: 85 },
];

export const timePerLesson: TimePerLesson[] = [
  { lesson: 'Intro to Components', minutes: 18 },
  { lesson: 'State & Props', minutes: 25 },
  { lesson: 'useEffect Deep Dive', minutes: 32 },
  { lesson: 'Type Inference', minutes: 20 },
  { lesson: 'Advanced Generics', minutes: 40 },
  { lesson: 'Design Thinking', minutes: 22 },
  { lesson: 'Scrum Framework', minutes: 15 },
  { lesson: 'Network Security', minutes: 35 },
  { lesson: 'AWS EC2 & S3', minutes: 30 },
];
