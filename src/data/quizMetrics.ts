import type { QuizMetric, ScoreDistribution, PassRateTrend } from '../types';

export const mockQuizMetrics: QuizMetric[] = [
  { id: '1', quizName: 'React Basics Quiz', courseName: 'React Fundamentals', attempts: 312, avgScore: 78, passRate: 82, userIds: ['1', '2', '5', '8', '12', '3', '6'] },
  { id: '2', quizName: 'Hooks & State Quiz', courseName: 'React Fundamentals', attempts: 287, avgScore: 72, passRate: 75, userIds: ['1', '2', '5', '8', '12', '7'] },
  { id: '3', quizName: 'TypeScript Types Quiz', courseName: 'Advanced TypeScript', attempts: 198, avgScore: 65, passRate: 68, userIds: ['1', '2', '5', '12', '9'] },
  { id: '4', quizName: 'Generics Quiz', courseName: 'Advanced TypeScript', attempts: 156, avgScore: 58, passRate: 55, userIds: ['2', '5', '12', '8'] },
  { id: '5', quizName: 'UX Principles Quiz', courseName: 'UX Design Principles', attempts: 134, avgScore: 85, passRate: 90, userIds: ['5', '7', '3', '6', '11'] },
  { id: '6', quizName: 'Usability Testing Quiz', courseName: 'UX Design Principles', attempts: 112, avgScore: 80, passRate: 85, userIds: ['5', '7', '3', '11'] },
  { id: '7', quizName: 'Agile Methods Quiz', courseName: 'Project Management', attempts: 245, avgScore: 76, passRate: 80, userIds: ['1', '2', '4', '6', '9', '10', '12'] },
  { id: '8', quizName: 'Security Fundamentals Quiz', courseName: 'Cybersecurity Basics', attempts: 98, avgScore: 70, passRate: 72, userIds: ['1', '2', '8', '9', '12'] },
  { id: '9', quizName: 'Cloud Services Quiz', courseName: 'Cloud Architecture', attempts: 178, avgScore: 74, passRate: 78, userIds: ['1', '2', '5', '8', '10', '12'] },
  { id: '10', quizName: 'Leadership Styles Quiz', courseName: 'Leadership Skills', attempts: 167, avgScore: 82, passRate: 88, userIds: ['1', '9', '3', '4', '6', '10'] },
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
