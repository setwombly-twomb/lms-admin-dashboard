import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

interface CompletionRow {
  key: string;
  title: string;
  type: 'Course' | 'Lesson' | 'Quiz';
  enrolled: number;
  completed: number;
  completionRate: number;
  avgTime: string;
  trend: 'up' | 'down';
  trendValue: string;
}

const mockCompletions: CompletionRow[] = [
  { key: '1', title: 'Introduction to React', type: 'Course', enrolled: 342, completed: 298, completionRate: 87, avgTime: '1h 45m', trend: 'up', trendValue: '+3.2%' },
  { key: '2', title: 'Advanced TypeScript Patterns', type: 'Course', enrolled: 218, completed: 157, completionRate: 72, avgTime: '3h 20m', trend: 'up', trendValue: '+1.8%' },
  { key: '3', title: 'CSS Grid Fundamentals', type: 'Lesson', enrolled: 189, completed: 178, completionRate: 94, avgTime: '32m', trend: 'up', trendValue: '+0.5%' },
  { key: '4', title: 'Node.js Security Best Practices', type: 'Course', enrolled: 156, completed: 106, completionRate: 68, avgTime: '4h 10m', trend: 'down', trendValue: '-2.1%' },
  { key: '5', title: 'Database Design Quiz', type: 'Quiz', enrolled: 274, completed: 249, completionRate: 91, avgTime: '18m', trend: 'up', trendValue: '+4.7%' },
  { key: '6', title: 'Docker & Kubernetes Basics', type: 'Course', enrolled: 123, completed: 44, completionRate: 36, avgTime: '5h 30m', trend: 'down', trendValue: '-5.3%' },
  { key: '7', title: 'API Design Principles', type: 'Lesson', enrolled: 198, completed: 162, completionRate: 82, avgTime: '48m', trend: 'up', trendValue: '+2.0%' },
  { key: '8', title: 'Machine Learning Foundations', type: 'Course', enrolled: 95, completed: 33, completionRate: 35, avgTime: '6h 15m', trend: 'down', trendValue: '-1.4%' },
  { key: '9', title: 'Python Data Structures', type: 'Quiz', enrolled: 312, completed: 243, completionRate: 78, avgTime: '22m', trend: 'up', trendValue: '+1.1%' },
  { key: '10', title: 'GraphQL Fundamentals', type: 'Course', enrolled: 87, completed: 55, completionRate: 63, avgTime: '2h 50m', trend: 'down', trendValue: '-0.8%' },
];

const typeBadge: Record<CompletionRow['type'], string> = {
  Course: 'bg-blue-100 text-blue-700',
  Lesson: 'bg-purple-100 text-purple-700',
  Quiz: 'bg-orange-100 text-orange-700',
};

function progressBarColor(rate: number): string {
  if (rate >= 80) return 'bg-green-500';
  if (rate >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

function progressBarTrack(rate: number): string {
  if (rate >= 80) return 'bg-green-100';
  if (rate >= 60) return 'bg-amber-100';
  return 'bg-red-100';
}

function rateTextColor(rate: number): string {
  if (rate >= 80) return 'text-green-700';
  if (rate >= 60) return 'text-amber-700';
  return 'text-red-700';
}

export default function CompletionRate() {
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
          <RiseOutlined className="text-amber-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Completion Rate</h2>
          <p className="text-sm text-gray-500">78.4% average across all content</p>
        </div>
      </div>

      {/* Insight cards */}
      <div className="space-y-2 mb-6">
        {/* Positive */}
        <div className="flex items-center justify-between border-l-4 border-l-green-400 bg-green-50/50 rounded-r-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <CheckCircleOutlined className="text-green-600 text-lg" />
            <span className="text-sm text-gray-700">
              Completion rate <strong>improved 2.3%</strong> this week &mdash; 5th consecutive week of growth
            </span>
          </div>
          <button className="text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-md px-3 py-1.5 transition-colors whitespace-nowrap">
            View Details
          </button>
        </div>

        {/* Critical */}
        <div className="flex items-center justify-between border-l-4 border-l-red-400 bg-red-50/50 rounded-r-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <ExclamationCircleOutlined className="text-red-600 text-lg" />
            <span className="text-sm text-gray-700">
              <strong>7 courses</strong> have completion rates below 40% &mdash; review content difficulty and length
            </span>
          </div>
          <button className="text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md px-3 py-1.5 transition-colors whitespace-nowrap">
            Review Courses
          </button>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between border-l-4 border-l-blue-400 bg-blue-50/50 rounded-r-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <InfoCircleOutlined className="text-blue-600 text-lg" />
            <span className="text-sm text-gray-700">
              Courses under 2 hours have <strong>91% completion</strong> vs 62% for courses over 4 hours
            </span>
          </div>
          <button className="text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md px-3 py-1.5 transition-colors whitespace-nowrap">
            View Details
          </button>
        </div>
      </div>

      {/* Data table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left font-medium text-gray-600 px-4 py-3">Content Title</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Type</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Enrolled</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Completed</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3 min-w-[180px]">Completion Rate</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Avg Time</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Trend</th>
            </tr>
          </thead>
          <tbody>
            {mockCompletions.map((row) => (
              <tr key={row.key} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{row.title}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadge[row.type]}`}>
                    {row.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{row.enrolled.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-600">{row.completed.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`flex-1 h-2 rounded-full ${progressBarTrack(row.completionRate)}`}>
                      <div
                        className={`h-2 rounded-full ${progressBarColor(row.completionRate)}`}
                        style={{ width: `${row.completionRate}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium w-10 text-right ${rateTextColor(row.completionRate)}`}>
                      {row.completionRate}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{row.avgTime}</td>
                <td className="px-4 py-3">
                  {row.trend === 'up' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                      <ArrowUpOutlined className="text-[10px]" />
                      {row.trendValue}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
                      <ArrowDownOutlined className="text-[10px]" />
                      {row.trendValue}
                    </span>
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
