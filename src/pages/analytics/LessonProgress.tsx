import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  FundProjectionScreenOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

interface LessonProgressRow {
  id: number;
  lessonName: string;
  enrolled: number;
  notStarted: number;
  inProgress: number;
  completed: number;
  avgProgress: number;
  overdue: number;
}

const mockData: LessonProgressRow[] = [
  { id: 1, lessonName: 'Frontend Development', enrolled: 124, notStarted: 8, inProgress: 42, completed: 74, avgProgress: 82, overdue: 3 },
  { id: 2, lessonName: 'Backend Fundamentals', enrolled: 98, notStarted: 15, inProgress: 38, completed: 45, avgProgress: 64, overdue: 7 },
  { id: 3, lessonName: 'Database Design', enrolled: 76, notStarted: 12, inProgress: 29, completed: 35, avgProgress: 58, overdue: 5 },
  { id: 4, lessonName: 'DevOps Essentials', enrolled: 54, notStarted: 18, inProgress: 22, completed: 14, avgProgress: 41, overdue: 9 },
  { id: 5, lessonName: 'Cloud Architecture', enrolled: 67, notStarted: 21, inProgress: 26, completed: 20, avgProgress: 47, overdue: 11 },
  { id: 6, lessonName: 'Mobile Development', enrolled: 89, notStarted: 10, inProgress: 34, completed: 45, avgProgress: 68, overdue: 4 },
  { id: 7, lessonName: 'UI/UX Principles', enrolled: 112, notStarted: 5, inProgress: 28, completed: 79, avgProgress: 85, overdue: 2 },
  { id: 8, lessonName: 'Data Structures', enrolled: 83, notStarted: 14, inProgress: 35, completed: 34, avgProgress: 55, overdue: 8 },
  { id: 9, lessonName: 'Agile Methodology', enrolled: 95, notStarted: 6, inProgress: 19, completed: 70, avgProgress: 79, overdue: 1 },
  { id: 10, lessonName: 'Cybersecurity Basics', enrolled: 61, notStarted: 17, inProgress: 24, completed: 20, avgProgress: 48, overdue: 6 },
];

const insights = [
  {
    type: 'positive' as const,
    text: 'Average progress across all lessons is 67.3% \u2014 up 4.5% from last month',
    action: 'View Trends',
  },
  {
    type: 'info' as const,
    text: 'Frontend Development folder has the highest engagement at 82% avg progress',
    action: 'View Details',
  },
  {
    type: 'critical' as const,
    text: '8 learners are below 25% progress on overdue assignments \u2014 escalate to managers',
    action: 'Escalate',
  },
];

const insightStyles = {
  positive: {
    border: 'border-l-green-400',
    bg: 'bg-green-50/50',
    icon: <CheckCircleOutlined className="text-green-500 text-base mt-0.5" />,
    button: 'text-green-700 hover:text-green-900 bg-green-100 hover:bg-green-200',
  },
  info: {
    border: 'border-l-blue-400',
    bg: 'bg-blue-50/50',
    icon: <InfoCircleOutlined className="text-blue-500 text-base mt-0.5" />,
    button: 'text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200',
  },
  critical: {
    border: 'border-l-red-400',
    bg: 'bg-red-50/50',
    icon: <ExclamationCircleOutlined className="text-red-500 text-base mt-0.5" />,
    button: 'text-red-700 hover:text-red-900 bg-red-100 hover:bg-red-200',
  },
};

export default function LessonProgress() {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <LeftOutlined className="text-xs" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
          <FundProjectionScreenOutlined className="text-purple-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Overall Lesson Progress</h2>
          <p className="text-sm text-gray-500">Enrollment status, progress distribution, and overdue tracking</p>
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
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Enrolled</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Not Started</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">In Progress</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Completed</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Avg Progress %</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Overdue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.lessonName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.enrolled}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{row.notStarted}</td>
                <td className="px-4 py-3 text-sm text-blue-600 font-medium">{row.inProgress}</td>
                <td className="px-4 py-3 text-sm text-green-600 font-medium">{row.completed}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          row.avgProgress >= 70
                            ? 'bg-green-500'
                            : row.avgProgress >= 50
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${row.avgProgress}%` }}
                      />
                    </div>
                    <span className="text-gray-600">{row.avgProgress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  {row.overdue > 0 ? (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.overdue >= 8
                          ? 'bg-red-100 text-red-700'
                          : row.overdue >= 4
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {row.overdue}
                    </span>
                  ) : (
                    <span className="text-green-600 text-xs font-medium">None</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
