import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserAddOutlined,
  TeamOutlined,
  SettingOutlined,
  UploadOutlined,
  FileAddOutlined,
  DownloadOutlined,
  UserOutlined,
  FolderOpenOutlined,
  BarChartOutlined,
  RiseOutlined,
  CalendarOutlined,
  DownOutlined,
  FormOutlined,
  RobotOutlined,
} from '@ant-design/icons';

interface FlowItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  action?: string;
}

const userFlows: FlowItem[] = [
  { title: 'Create Users', icon: UserAddOutlined, path: '/users' },
  { title: 'Manage Groups', icon: TeamOutlined, path: '/groups' },
  { title: 'Manage Attributes', icon: SettingOutlined, path: '/attributes' },
];

const contentFlows: FlowItem[] = [
  { title: 'Assign Content', icon: UploadOutlined, path: '/courses/assign' },
  { title: 'Create Content', icon: FileAddOutlined, action: 'createContent' },
  { title: 'Export Data', icon: DownloadOutlined, path: '/analytics/quizzes' },
];

const quizStats = [
  { label: 'Completions', value: '1,247', change: '+12%' },
  { label: 'Avg Score', value: '84.5%', change: '+3.2%' },
  { label: 'Pass Rate', value: '91.2%', change: '+5.1%' },
];

const lessonStats = [
  { label: 'In Progress', value: '892', change: '+18%' },
  { label: 'Completed', value: '156', change: '+24' },
  { label: 'Avg Progress', value: '67.3%', change: '+4.5%' },
];

const recentQuizzes = [
  { title: 'JavaScript Fundamentals Quiz', user: 'Emily Chen', score: '92%', time: '1h ago' },
  { title: 'React Hooks Assessment', user: 'David Wilson', score: '88%', time: '3h ago' },
  { title: 'CSS Grid & Flexbox Quiz', user: 'Lisa Anderson', score: '95%', time: '4h ago' },
];

const recentLessons = [
  { title: 'Introduction to React', user: 'John Smith', time: '2h ago' },
  { title: 'Advanced JavaScript', user: 'Sarah Johnson', time: '3h ago' },
  { title: 'CSS Fundamentals', user: 'Mike Davis', time: '5h ago' },
];

const timePeriods = ['Today', 'Yesterday', 'Last 7 days', 'Last 14 days', 'Last 30 days'];

function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'lesson'>('quiz');
  const [timePeriod, setTimePeriod] = useState('Last 7 days');
  const [showDropdown, setShowDropdown] = useState(false);
  const [createContentOpen, setCreateContentOpen] = useState(false);
  const navigate = useNavigate();

  const handleFlowClick = (flow: FlowItem) => {
    if (flow.action === 'createContent') {
      setCreateContentOpen(true);
    } else if (flow.path) {
      navigate(flow.path);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Let's get started, what would you like to do?
        </h2>
        <p className="text-base text-gray-600">Manage users, content, and view analytics</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <button onClick={() => navigate('/users')} className="bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 p-3 hover:shadow-lg transition-shadow text-left cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-700 mb-0.5">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">2,847</p>
              <p className="text-xs text-blue-600 font-medium mt-0.5">+127 this month</p>
            </div>
            <div className="bg-blue-100 p-2.5 rounded-lg">
              <UserOutlined className="text-blue-600 text-lg" />
            </div>
          </div>
        </button>
        <button onClick={() => navigate('/courses')} className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100 p-3 hover:shadow-lg transition-shadow text-left cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-700 mb-0.5">Active Content</p>
              <p className="text-2xl font-semibold text-gray-900">162</p>
              <p className="text-xs text-purple-600 font-medium mt-0.5">+8 this month</p>
            </div>
            <div className="bg-purple-100 p-2.5 rounded-lg">
              <FolderOpenOutlined className="text-purple-600 text-lg" />
            </div>
          </div>
        </button>
        <button onClick={() => navigate('/analytics/lessons')} className="bg-gradient-to-br from-amber-50 to-white rounded-lg border border-amber-100 p-3 hover:shadow-lg transition-shadow text-left cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-700 mb-0.5">Completion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">78.4%</p>
              <p className="text-xs text-amber-600 font-medium mt-0.5">+2.3% this week</p>
            </div>
            <div className="bg-amber-100 p-2.5 rounded-lg">
              <RiseOutlined className="text-amber-600 text-lg" />
            </div>
          </div>
        </button>
      </div>

      {/* Quick Action Cards */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* User Management */}
        <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white p-3 w-full md:w-auto md:min-w-[320px] md:max-w-[380px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
              <UserOutlined className="text-blue-600 text-xs" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">User Management</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {userFlows.map((flow) => {
              const Icon = flow.icon;
              return (
                <button
                  key={flow.title}
                  onClick={() => handleFlowClick(flow)}
                  className="flex flex-col items-center gap-1.5 p-2.5 bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all group text-center"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Icon className="text-blue-600 text-sm" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 leading-tight">{flow.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Management */}
        <div className="rounded-lg border border-purple-100 bg-gradient-to-br from-purple-50/60 to-white p-3 w-full md:w-auto md:min-w-[320px] md:max-w-[380px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center">
              <FolderOpenOutlined className="text-purple-600 text-xs" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Content Management</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {contentFlows.map((flow) => {
              const Icon = flow.icon;
              return (
                <button
                  key={flow.title}
                  onClick={() => handleFlowClick(flow)}
                  className="flex flex-col items-center gap-1.5 p-2.5 bg-white rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all group text-center"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center transition-colors">
                    <Icon className="text-purple-600 text-sm" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 leading-tight">{flow.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Analytics — Full Width */}
      <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <BarChartOutlined className="text-emerald-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Analytics</h2>
          </div>

          {/* Time Period Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <CalendarOutlined className="text-gray-600" />
              <span className="text-gray-700 text-sm">{timePeriod}</span>
              <DownOutlined className="text-gray-500 text-xs" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {timePeriods.map((period) => (
                  <button
                    key={period}
                    onClick={() => { setTimePeriod(period); setShowDropdown(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      timePeriod === period ? 'bg-gray-100 font-medium text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-1 pb-3 font-medium text-base transition-colors ${
              activeTab === 'quiz'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Quiz Performance
          </button>
          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-1 pb-3 font-medium text-base transition-colors ${
              activeTab === 'lesson'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Lesson Progress
          </button>
        </div>

        {/* Tab Content — Quiz */}
        {activeTab === 'quiz' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {quizStats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Recent Quiz Completions</h3>
            <div className="space-y-2">
              {recentQuizzes.map((quiz) => (
                <div key={quiz.title} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-base truncate">{quiz.title}</p>
                    <p className="text-sm text-gray-600">{quiz.user}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-semibold text-gray-900">{quiz.score}</p>
                    <p className="text-sm text-gray-500">{quiz.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content — Lesson */}
        {activeTab === 'lesson' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {lessonStats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Recent Lesson Completions</h3>
            <div className="space-y-2">
              {recentLessons.map((lesson) => (
                <div key={lesson.title} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-base truncate">{lesson.title}</p>
                    <p className="text-sm text-gray-600">{lesson.user}</p>
                  </div>
                  <span className="text-sm text-gray-500 ml-4">{lesson.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Content Modal */}
      {createContentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40" onClick={() => setCreateContentOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Content</h3>
            <p className="text-sm text-gray-500 mb-6">How would you like to create your content?</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { setCreateContentOpen(false); navigate('/courses'); }}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center transition-colors">
                  <FormOutlined className="text-purple-600 text-2xl" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-sm">Manually Create</p>
                  <p className="text-xs text-gray-500 mt-1">Build content from scratch using the editor</p>
                </div>
              </button>
              <button
                onClick={() => { setCreateContentOpen(false); navigate('/courses'); }}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <RobotOutlined className="text-blue-600 text-2xl" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-sm">Create with AI</p>
                  <p className="text-xs text-gray-500 mt-1">Generate content using AI assistance</p>
                </div>
              </button>
            </div>
            <button
              onClick={() => setCreateContentOpen(false)}
              className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
