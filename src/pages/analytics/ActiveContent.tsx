import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  FolderOpenOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

interface ContentRow {
  key: string;
  title: string;
  type: 'Course' | 'Lesson' | 'Quiz';
  category: string;
  enrollments: number;
  completionRate: number;
  status: 'Published' | 'Draft';
  lastUpdated: string;
}

const mockContent: ContentRow[] = [
  { key: '1', title: 'Introduction to React', type: 'Course', category: 'Frontend Development', enrollments: 342, completionRate: 87, status: 'Published', lastUpdated: 'Jan 28, 2026' },
  { key: '2', title: 'Advanced TypeScript Patterns', type: 'Course', category: 'Frontend Development', enrollments: 218, completionRate: 72, status: 'Published', lastUpdated: 'Jan 25, 2026' },
  { key: '3', title: 'CSS Grid Fundamentals', type: 'Lesson', category: 'Frontend Development', enrollments: 189, completionRate: 94, status: 'Published', lastUpdated: 'Feb 1, 2026' },
  { key: '4', title: 'Node.js Security Best Practices', type: 'Course', category: 'Backend Development', enrollments: 156, completionRate: 68, status: 'Published', lastUpdated: 'Jan 20, 2026' },
  { key: '5', title: 'Database Design Quiz', type: 'Quiz', category: 'Backend Development', enrollments: 274, completionRate: 91, status: 'Published', lastUpdated: 'Feb 3, 2026' },
  { key: '6', title: 'Docker & Kubernetes Basics', type: 'Course', category: 'DevOps', enrollments: 123, completionRate: 54, status: 'Published', lastUpdated: 'Dec 15, 2025' },
  { key: '7', title: 'API Design Principles', type: 'Lesson', category: 'Backend Development', enrollments: 198, completionRate: 82, status: 'Published', lastUpdated: 'Jan 30, 2026' },
  { key: '8', title: 'Agile Methodology Overview', type: 'Course', category: 'Project Management', enrollments: 0, completionRate: 0, status: 'Draft', lastUpdated: 'Feb 5, 2026' },
  { key: '9', title: 'Python Data Structures', type: 'Quiz', category: 'Data Science', enrollments: 312, completionRate: 78, status: 'Published', lastUpdated: 'Jan 18, 2026' },
  { key: '10', title: 'GraphQL Fundamentals', type: 'Course', category: 'Frontend Development', enrollments: 87, completionRate: 63, status: 'Published', lastUpdated: 'Jan 12, 2026' },
];

const typeBadge: Record<ContentRow['type'], string> = {
  Course: 'bg-blue-100 text-blue-700',
  Lesson: 'bg-purple-100 text-purple-700',
  Quiz: 'bg-orange-100 text-orange-700',
};

const statusBadge: Record<ContentRow['status'], string> = {
  Published: 'bg-green-100 text-green-700',
  Draft: 'bg-gray-100 text-gray-500',
};

function completionColor(rate: number): string {
  if (rate >= 80) return 'text-green-600';
  if (rate >= 60) return 'text-amber-600';
  return 'text-red-600';
}

export default function ActiveContent() {
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
          <FolderOpenOutlined className="text-purple-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Active Content</h2>
          <p className="text-sm text-gray-500">162 published content items</p>
        </div>
      </div>

      {/* Insight cards */}
      <div className="space-y-2 mb-6">
        {/* Positive */}
        <div className="flex items-center justify-between border-l-4 border-l-green-400 bg-green-50/50 rounded-r-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <CheckCircleOutlined className="text-green-600 text-lg" />
            <span className="text-sm text-gray-700">
              <strong>8 new content items</strong> published this month &mdash; consistent with quarterly targets
            </span>
          </div>
          <button className="text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-md px-3 py-1.5 transition-colors whitespace-nowrap">
            View Details
          </button>
        </div>

        {/* Warning */}
        <div className="flex items-center justify-between border-l-4 border-l-amber-400 bg-amber-50/50 rounded-r-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <WarningOutlined className="text-amber-600 text-lg" />
            <span className="text-sm text-gray-700">
              <strong>12 courses</strong> have no enrollments in the past 30 days &mdash; consider archiving or promoting
            </span>
          </div>
          <button className="text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-md px-3 py-1.5 transition-colors whitespace-nowrap">
            Archive
          </button>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between border-l-4 border-l-blue-400 bg-blue-50/50 rounded-r-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <InfoCircleOutlined className="text-blue-600 text-lg" />
            <span className="text-sm text-gray-700">
              Most popular category is <strong>Frontend Development</strong> with 43 items and 1,200+ enrollments
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
              <th className="text-left font-medium text-gray-600 px-4 py-3">Title</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Type</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Category</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Enrollments</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Completion Rate</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Status</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {mockContent.map((item) => (
              <tr key={item.key} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadge[item.type]}`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.category}</td>
                <td className="px-4 py-3 text-gray-600">{item.enrollments.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${completionColor(item.completionRate)}`}>
                    {item.completionRate}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{item.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
