import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  TrophyOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

interface QuizScoreRow {
  id: number;
  quizName: string;
  avgScore: number;
  medianScore: number;
  lowestScore: number;
  highestScore: number;
  stdDeviation: number;
  attempts: number;
}

const mockData: QuizScoreRow[] = [
  { id: 1, quizName: 'React Hooks Assessment', avgScore: 81, medianScore: 84, lowestScore: 42, highestScore: 100, stdDeviation: 12.3, attempts: 187 },
  { id: 2, quizName: 'JavaScript Fundamentals', avgScore: 76, medianScore: 78, lowestScore: 35, highestScore: 98, stdDeviation: 14.7, attempts: 312 },
  { id: 3, quizName: 'CSS Grid Quiz', avgScore: 62, medianScore: 60, lowestScore: 22, highestScore: 95, stdDeviation: 18.1, attempts: 145 },
  { id: 4, quizName: 'TypeScript Basics', avgScore: 84, medianScore: 87, lowestScore: 48, highestScore: 100, stdDeviation: 10.5, attempts: 203 },
  { id: 5, quizName: 'Node.js Essentials', avgScore: 71, medianScore: 73, lowestScore: 30, highestScore: 96, stdDeviation: 15.9, attempts: 98 },
  { id: 6, quizName: 'REST API Design', avgScore: 78, medianScore: 80, lowestScore: 40, highestScore: 99, stdDeviation: 13.2, attempts: 156 },
  { id: 7, quizName: 'Git & Version Control', avgScore: 89, medianScore: 92, lowestScore: 55, highestScore: 100, stdDeviation: 8.4, attempts: 224 },
  { id: 8, quizName: 'SQL Fundamentals', avgScore: 68, medianScore: 65, lowestScore: 28, highestScore: 94, stdDeviation: 16.8, attempts: 89 },
  { id: 9, quizName: 'React Router Patterns', avgScore: 74, medianScore: 76, lowestScore: 38, highestScore: 97, stdDeviation: 14.1, attempts: 134 },
  { id: 10, quizName: 'HTML Accessibility', avgScore: 82, medianScore: 85, lowestScore: 45, highestScore: 100, stdDeviation: 11.6, attempts: 167 },
];

const insights = [
  {
    type: 'warning' as const,
    text: 'CSS Grid Quiz has the lowest average score (62%) \u2014 review question difficulty',
    action: 'Review Quiz',
  },
  {
    type: 'info' as const,
    text: '3 quizzes show declining score trends over the past 2 weeks',
    action: 'View Trends',
  },
  {
    type: 'positive' as const,
    text: 'Top performers consistently score above 90% on React-related quizzes',
    action: 'View Details',
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

export default function QuizScores() {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <LeftOutlined className="text-xs" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <TrophyOutlined className="text-amber-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Quiz Score Analysis</h2>
          <p className="text-sm text-gray-500">Detailed score breakdowns and statistical analysis across all quizzes</p>
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
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Avg Score</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Median Score</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Lowest Score</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Highest Score</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Std Deviation</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Attempts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.quizName}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.avgScore >= 80
                        ? 'bg-green-100 text-green-700'
                        : row.avgScore >= 70
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {row.avgScore}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.medianScore}%</td>
                <td className="px-4 py-3 text-sm text-red-600">{row.lowestScore}%</td>
                <td className="px-4 py-3 text-sm text-green-600">{row.highestScore}%</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.stdDeviation}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.attempts.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
