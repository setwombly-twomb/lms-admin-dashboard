import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  LoadingOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

interface LessonInProgressRow {
  id: number;
  lessonName: string;
  activeLearners: number;
  avgProgress: number;
  avgTimeSpent: string;
  stalledCount: number;
  startedThisWeek: number;
}

const mockData: LessonInProgressRow[] = [
  { id: 1, lessonName: 'Advanced JavaScript', activeLearners: 87, avgProgress: 42, avgTimeSpent: '2h 15m', stalledCount: 39, startedThisWeek: 12 },
  { id: 2, lessonName: 'React Component Patterns', activeLearners: 64, avgProgress: 58, avgTimeSpent: '1h 45m', stalledCount: 18, startedThisWeek: 9 },
  { id: 3, lessonName: 'CSS Animations & Transitions', activeLearners: 45, avgProgress: 71, avgTimeSpent: '1h 20m', stalledCount: 8, startedThisWeek: 15 },
  { id: 4, lessonName: 'TypeScript Generics', activeLearners: 52, avgProgress: 35, avgTimeSpent: '2h 40m', stalledCount: 24, startedThisWeek: 7 },
  { id: 5, lessonName: 'Node.js Streams', activeLearners: 38, avgProgress: 48, avgTimeSpent: '1h 55m', stalledCount: 16, startedThisWeek: 5 },
  { id: 6, lessonName: 'GraphQL Basics', activeLearners: 71, avgProgress: 62, avgTimeSpent: '1h 30m', stalledCount: 14, startedThisWeek: 22 },
  { id: 7, lessonName: 'Docker for Developers', activeLearners: 33, avgProgress: 29, avgTimeSpent: '3h 10m', stalledCount: 15, startedThisWeek: 4 },
  { id: 8, lessonName: 'Testing with Jest', activeLearners: 56, avgProgress: 55, avgTimeSpent: '1h 40m', stalledCount: 12, startedThisWeek: 11 },
  { id: 9, lessonName: 'REST API Best Practices', activeLearners: 42, avgProgress: 67, avgTimeSpent: '1h 15m', stalledCount: 6, startedThisWeek: 8 },
  { id: 10, lessonName: 'Web Security Essentials', activeLearners: 29, avgProgress: 38, avgTimeSpent: '2h 25m', stalledCount: 10, startedThisWeek: 3 },
];

const insights = [
  {
    type: 'critical' as const,
    text: "142 learners haven't made progress in 7+ days \u2014 send a reminder",
    action: 'Send Reminder',
  },
  {
    type: 'warning' as const,
    text: 'Advanced JavaScript has the highest drop-off rate at 45%',
    action: 'Review Lesson',
  },
  {
    type: 'info' as const,
    text: 'Average time-to-complete is trending upward \u2014 content may need simplification',
    action: 'View Trends',
  },
];

const insightStyles = {
  critical: {
    border: 'border-l-red-400',
    bg: 'bg-red-50/50',
    icon: <ExclamationCircleOutlined className="text-red-500 text-base mt-0.5" />,
    button: 'text-red-700 hover:text-red-900 bg-red-100 hover:bg-red-200',
  },
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
};

export default function LessonsInProgress() {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <LeftOutlined className="text-xs" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
          <LoadingOutlined className="text-orange-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Lessons In Progress</h2>
          <p className="text-sm text-gray-500">Monitor active learner engagement and identify stalled progress</p>
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
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Lesson Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Active Learners</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Avg Progress %</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Avg Time Spent</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Stalled (7+ days)</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Started This Week</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.lessonName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.activeLearners}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          row.avgProgress >= 60
                            ? 'bg-green-500'
                            : row.avgProgress >= 40
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${row.avgProgress}%` }}
                      />
                    </div>
                    <span className="text-gray-600">{row.avgProgress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.avgTimeSpent}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.stalledCount >= 20
                        ? 'bg-red-100 text-red-700'
                        : row.stalledCount >= 10
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {row.stalledCount}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.startedThisWeek}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
