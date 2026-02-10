import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

interface QuizPassRateRow {
  id: number;
  quizName: string;
  passRate: number;
  totalPasses: number;
  totalFails: number;
  retakeRate: number;
  avgAttemptsToPass: number;
}

const mockData: QuizPassRateRow[] = [
  { id: 1, quizName: 'React Hooks Assessment', passRate: 88.2, totalPasses: 165, totalFails: 22, retakeRate: 14.3, avgAttemptsToPass: 1.3 },
  { id: 2, quizName: 'JavaScript Fundamentals', passRate: 68.0, totalPasses: 212, totalFails: 100, retakeRate: 38.5, avgAttemptsToPass: 2.1 },
  { id: 3, quizName: 'CSS Grid Quiz', passRate: 72.4, totalPasses: 105, totalFails: 40, retakeRate: 31.0, avgAttemptsToPass: 1.8 },
  { id: 4, quizName: 'TypeScript Basics', passRate: 91.6, totalPasses: 186, totalFails: 17, retakeRate: 9.1, avgAttemptsToPass: 1.1 },
  { id: 5, quizName: 'Node.js Essentials', passRate: 76.5, totalPasses: 75, totalFails: 23, retakeRate: 25.5, avgAttemptsToPass: 1.6 },
  { id: 6, quizName: 'REST API Design', passRate: 83.3, totalPasses: 130, totalFails: 26, retakeRate: 18.6, avgAttemptsToPass: 1.4 },
  { id: 7, quizName: 'Git & Version Control', passRate: 95.1, totalPasses: 213, totalFails: 11, retakeRate: 5.4, avgAttemptsToPass: 1.1 },
  { id: 8, quizName: 'SQL Fundamentals', passRate: 70.8, totalPasses: 63, totalFails: 26, retakeRate: 33.7, avgAttemptsToPass: 1.9 },
  { id: 9, quizName: 'React Router Patterns', passRate: 79.1, totalPasses: 106, totalFails: 28, retakeRate: 22.4, avgAttemptsToPass: 1.5 },
  { id: 10, quizName: 'HTML Accessibility', passRate: 86.8, totalPasses: 145, totalFails: 22, retakeRate: 15.0, avgAttemptsToPass: 1.2 },
];

const insights = [
  {
    type: 'positive' as const,
    text: 'Overall pass rate improved 5.1% this month \u2014 up from 86.1%',
    action: 'View Trends',
  },
  {
    type: 'warning' as const,
    text: 'JavaScript Fundamentals Quiz has the lowest pass rate (68%) \u2014 consider adding study materials',
    action: 'Review Quiz',
  },
  {
    type: 'critical' as const,
    text: '12 learners have failed the same quiz 3+ times \u2014 consider offering targeted support',
    action: 'View Learners',
  },
];

const insightStyles = {
  positive: {
    border: 'border-l-green-400',
    bg: 'bg-green-50/50',
    icon: <CheckCircleOutlined className="text-green-500 text-base mt-0.5" />,
    button: 'text-green-700 hover:text-green-900 bg-green-100 hover:bg-green-200',
  },
  warning: {
    border: 'border-l-amber-400',
    bg: 'bg-amber-50/50',
    icon: <WarningOutlined className="text-amber-500 text-base mt-0.5" />,
    button: 'text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200',
  },
  critical: {
    border: 'border-l-red-400',
    bg: 'bg-red-50/50',
    icon: <ExclamationCircleOutlined className="text-red-500 text-base mt-0.5" />,
    button: 'text-red-700 hover:text-red-900 bg-red-100 hover:bg-red-200',
  },
};

export default function QuizPassRate() {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <LeftOutlined className="text-xs" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <SafetyCertificateOutlined className="text-blue-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Quiz Pass Rate Analysis</h2>
          <p className="text-sm text-gray-500">Pass/fail metrics, retake patterns, and learner performance</p>
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
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Pass Rate</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Total Passes</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Total Fails</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Retake Rate</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Avg Attempts to Pass</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.quizName}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.passRate >= 85
                        ? 'bg-green-100 text-green-700'
                        : row.passRate >= 75
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {row.passRate}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-green-600 font-medium">{row.totalPasses}</td>
                <td className="px-4 py-3 text-sm text-red-600 font-medium">{row.totalFails}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.retakeRate}%</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.avgAttemptsToPass}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
