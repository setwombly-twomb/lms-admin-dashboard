import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface QuizCompletionRow {
  id: number;
  quizName: string;
  totalAttempts: number;
  completions: number;
  completionRate: number;
  avgTime: string;
  lastCompleted: string;
}

const mockData: QuizCompletionRow[] = [
  { id: 1, quizName: 'React Hooks Assessment', totalAttempts: 187, completions: 164, completionRate: 87.7, avgTime: '14 min', lastCompleted: '2 hours ago' },
  { id: 2, quizName: 'JavaScript Fundamentals', totalAttempts: 312, completions: 289, completionRate: 92.6, avgTime: '18 min', lastCompleted: '35 min ago' },
  { id: 3, quizName: 'CSS Grid Quiz', totalAttempts: 145, completions: 62, completionRate: 42.8, avgTime: '22 min', lastCompleted: '1 day ago' },
  { id: 4, quizName: 'TypeScript Basics', totalAttempts: 203, completions: 178, completionRate: 87.7, avgTime: '16 min', lastCompleted: '4 hours ago' },
  { id: 5, quizName: 'Node.js Essentials', totalAttempts: 98, completions: 41, completionRate: 41.8, avgTime: '25 min', lastCompleted: '3 days ago' },
  { id: 6, quizName: 'REST API Design', totalAttempts: 156, completions: 134, completionRate: 85.9, avgTime: '20 min', lastCompleted: '6 hours ago' },
  { id: 7, quizName: 'Git & Version Control', totalAttempts: 224, completions: 210, completionRate: 93.8, avgTime: '12 min', lastCompleted: '1 hour ago' },
  { id: 8, quizName: 'SQL Fundamentals', totalAttempts: 89, completions: 38, completionRate: 42.7, avgTime: '28 min', lastCompleted: '5 days ago' },
  { id: 9, quizName: 'React Router Patterns', totalAttempts: 134, completions: 56, completionRate: 41.8, avgTime: '19 min', lastCompleted: '2 days ago' },
  { id: 10, quizName: 'HTML Accessibility', totalAttempts: 167, completions: 71, completionRate: 42.5, avgTime: '15 min', lastCompleted: '12 hours ago' },
];

const insights = [
  {
    type: 'warning' as const,
    text: '5 quizzes have completion rates below 50% \u2014 consider simplifying content',
    action: 'Review Quizzes',
  },
  {
    type: 'info' as const,
    text: 'React Hooks Assessment has 23 pending submissions awaiting review',
    action: 'View Pending',
  },
  {
    type: 'positive' as const,
    text: 'Completion volume peaked last Tuesday \u2014 consider scheduling new quizzes mid-week',
    action: 'View Trends',
  },
];

const insightStyles = {
  warning: {
    border: 'border-l-amber-400',
    bg: 'bg-amber-50/50',
    icon: <WarningOutlined className="text-amber-500 text-base mt-0.5" />,
    button: 'text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200',
  },
  info: {
    border: 'border-l-blue-400',
    bg: 'bg-blue-50/50',
    icon: <InfoCircleOutlined className="text-blue-500 text-base mt-0.5" />,
    button: 'text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200',
  },
  positive: {
    border: 'border-l-green-400',
    bg: 'bg-green-50/50',
    icon: <CheckCircleOutlined className="text-green-500 text-base mt-0.5" />,
    button: 'text-green-700 hover:text-green-900 bg-green-100 hover:bg-green-200',
  },
};

export default function QuizCompletions() {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <LeftOutlined className="text-xs" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
          <CheckCircleOutlined className="text-emerald-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Quiz Completions</h2>
          <p className="text-sm text-gray-500">Track completion rates and patterns across all quizzes</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {insights.map((insight, idx) => {
          const style = insightStyles[insight.type];
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${style.border} ${style.bg}`}
            >
              {style.icon}
              <span className="text-sm text-gray-700 flex-1">{insight.text}</span>
              <button
                className={`text-xs font-medium px-3 py-1 rounded-md transition-colors whitespace-nowrap ${style.button}`}
              >
                {insight.action}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Quiz Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Total Attempts</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Completions</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Completion Rate</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Avg Time</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Last Completed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.quizName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.totalAttempts.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.completions.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.completionRate >= 80
                        ? 'bg-green-100 text-green-700'
                        : row.completionRate >= 60
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {row.completionRate}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <ClockCircleOutlined className="text-gray-400 text-xs" />
                    {row.avgTime}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{row.lastCompleted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
