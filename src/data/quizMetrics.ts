import type { QuizMetric, ScoreDistribution, PassRateTrend } from '../types';

export const mockQuizMetrics: QuizMetric[] = [
  { id: '1', quizName: 'React Basics Quiz', courseName: 'React Fundamentals', attempts: 312, avgScore: 78, passRate: 82 },
  { id: '2', quizName: 'Hooks & State Quiz', courseName: 'React Fundamentals', attempts: 287, avgScore: 72, passRate: 75 },
  { id: '3', quizName: 'TypeScript Types Quiz', courseName: 'Advanced TypeScript', attempts: 198, avgScore: 65, passRate: 68 },
  { id: '4', quizName: 'Generics Quiz', courseName: 'Advanced TypeScript', attempts: 156, avgScore: 58, passRate: 55 },
  { id: '5', quizName: 'UX Principles Quiz', courseName: 'UX Design Principles', attempts: 134, avgScore: 85, passRate: 90 },
  { id: '6', quizName: 'Usability Testing Quiz', courseName: 'UX Design Principles', attempts: 112, avgScore: 80, passRate: 85 },
  { id: '7', quizName: 'Agile Methods Quiz', courseName: 'Project Management', attempts: 245, avgScore: 76, passRate: 80 },
  { id: '8', quizName: 'Security Fundamentals Quiz', courseName: 'Cybersecurity Basics', attempts: 98, avgScore: 70, passRate: 72 },
  { id: '9', quizName: 'Cloud Services Quiz', courseName: 'Cloud Architecture', attempts: 178, avgScore: 74, passRate: 78 },
  { id: '10', quizName: 'Leadership Styles Quiz', courseName: 'Leadership Skills', attempts: 167, avgScore: 82, passRate: 88 },
];

export const scoreDistribution: ScoreDistribution[] = [
  { range: '0-20', count: 12 },
  { range: '21-40', count: 34 },
  { range: '41-60', count: 89 },
  { range: '61-80', count: 245 },
  { range: '81-100', count: 187 },
];

export const passRateTrend: PassRateTrend[] = [
  { month: 'Jul', rate: 68 },
  { month: 'Aug', rate: 71 },
  { month: 'Sep', rate: 74 },
  { month: 'Oct', rate: 73 },
  { month: 'Nov', rate: 77 },
  { month: 'Dec', rate: 79 },
  { month: 'Jan', rate: 82 },
];
