import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  UserOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

interface UserRow {
  key: string;
  name: string;
  email: string;
  role: 'Admin' | 'Instructor' | 'Learner';
  status: 'Active' | 'Inactive';
  groups: number;
  lastActive: string;
}

const mockUsers: UserRow[] = [
  { key: '1', name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Admin', status: 'Active', groups: 5, lastActive: '2 hours ago' },
  { key: '2', name: 'Marcus Johnson', email: 'marcus.j@company.com', role: 'Instructor', status: 'Active', groups: 3, lastActive: '1 day ago' },
  { key: '3', name: 'Emily Rodriguez', email: 'emily.r@company.com', role: 'Learner', status: 'Active', groups: 2, lastActive: '3 hours ago' },
  { key: '4', name: 'David Kim', email: 'david.kim@company.com', role: 'Learner', status: 'Active', groups: 4, lastActive: '5 hours ago' },
  { key: '5', name: 'Priya Patel', email: 'priya.p@company.com', role: 'Instructor', status: 'Active', groups: 6, lastActive: '12 hours ago' },
  { key: '6', name: 'James Wilson', email: 'james.w@company.com', role: 'Learner', status: 'Inactive', groups: 1, lastActive: '45 days ago' },
  { key: '7', name: 'Aisha Mohammed', email: 'aisha.m@company.com', role: 'Learner', status: 'Active', groups: 3, lastActive: '1 hour ago' },
  { key: '8', name: 'Tom Nguyen', email: 'tom.n@company.com', role: 'Admin', status: 'Active', groups: 7, lastActive: '30 minutes ago' },
  { key: '9', name: 'Lisa Thompson', email: 'lisa.t@company.com', role: 'Learner', status: 'Inactive', groups: 2, lastActive: '38 days ago' },
  { key: '10', name: 'Carlos Rivera', email: 'carlos.r@company.com', role: 'Instructor', status: 'Active', groups: 4, lastActive: '6 hours ago' },
];

const roleBadge: Record<UserRow['role'], string> = {
  Admin: 'bg-red-100 text-red-700',
  Instructor: 'bg-purple-100 text-purple-700',
  Learner: 'bg-blue-100 text-blue-700',
};

const statusBadge: Record<UserRow['status'], string> = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-gray-100 text-gray-500',
};

export default function TotalUsers() {
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
          <UserOutlined className="text-blue-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Total Users</h2>
          <p className="text-sm text-gray-500">2,847 users across all roles</p>
        </div>
      </div>

      {/* Insight cards */}
      <div className="space-y-2 mb-6">
        {/* Positive */}
        <div className="flex items-center justify-between border-l-4 border-l-green-400 bg-green-50/50 rounded-r-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <CheckCircleOutlined className="text-green-600 text-lg" />
            <span className="text-sm text-gray-700">
              <strong>127 new users</strong> added this month &mdash; 34% above last month&rsquo;s growth rate
            </span>
          </div>
          <button className="text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-md px-3 py-1.5 transition-colors whitespace-nowrap">
            View Users
          </button>
        </div>

        {/* Warning */}
        <div className="flex items-center justify-between border-l-4 border-l-amber-400 bg-amber-50/50 rounded-r-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <WarningOutlined className="text-amber-600 text-lg" />
            <span className="text-sm text-gray-700">
              <strong>18 users</strong> have been inactive for 30+ days &mdash; consider sending re-engagement emails
            </span>
          </div>
          <button className="text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-md px-3 py-1.5 transition-colors whitespace-nowrap">
            Send Emails
          </button>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between border-l-4 border-l-blue-400 bg-blue-50/50 rounded-r-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <InfoCircleOutlined className="text-blue-600 text-lg" />
            <span className="text-sm text-gray-700">
              Learner-to-instructor ratio is <strong>12:1</strong> &mdash; within recommended range
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
              <th className="text-left font-medium text-gray-600 px-4 py-3">Name</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Email</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Role</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Status</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Groups</th>
              <th className="text-left font-medium text-gray-600 px-4 py-3">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.key} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadge[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.groups}</td>
                <td className="px-4 py-3 text-gray-500">{user.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
