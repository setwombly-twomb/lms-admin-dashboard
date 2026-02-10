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
  RightOutlined,
  CheckCircleFilled,
  SearchOutlined,
  BookOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
  TagOutlined,
} from '@ant-design/icons';

interface FlowItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  action?: string;
}

const userFlows: FlowItem[] = [
  { title: 'Create Users', icon: UserAddOutlined, action: 'createUser' },
  { title: 'Manage Groups', icon: TeamOutlined, path: '/groups' },
  { title: 'Manage Attributes', icon: SettingOutlined, path: '/attributes' },
  { title: 'Bulk Upload', icon: UploadOutlined, action: 'bulkUpload' },
];

const contentFlows: FlowItem[] = [
  { title: 'Assign Content', icon: UploadOutlined, action: 'assignContent' },
  { title: 'Create Content', icon: FileAddOutlined, action: 'createContent' },
  { title: 'Export Data', icon: DownloadOutlined, path: '/export' },
];

const quizStats = [
  { label: 'Completions', value: '1,247', change: '+12%', path: '/analytics/quizzes/completions' },
  { label: 'Avg Score', value: '84.5%', change: '+3.2%', path: '/analytics/quizzes/scores' },
  { label: 'Pass Rate', value: '91.2%', change: '+5.1%', path: '/analytics/quizzes/pass-rate' },
];

const lessonStats = [
  { label: 'In Progress', value: '892', change: '+18%', path: '/analytics/lessons/in-progress' },
  { label: 'Completed', value: '156', change: '+24', path: '/analytics/lessons/completed' },
  { label: 'Avg Progress', value: '67.3%', change: '+4.5%', path: '/analytics/lessons/progress' },
];

const recentQuizzes = [
  { id: 'rq1', title: 'JavaScript Fundamentals Quiz', user: 'Emily Chen', score: '92%', time: '1h ago' },
  { id: 'rq2', title: 'React Hooks Assessment', user: 'David Wilson', score: '88%', time: '2h ago' },
  { id: 'rq3', title: 'CSS Grid & Flexbox Quiz', user: 'Lisa Anderson', score: '95%', time: '3h ago' },
  { id: 'rq4', title: 'TypeScript Basics Quiz', user: 'Mike Davis', score: '76%', time: '4h ago' },
  { id: 'rq5', title: 'Node.js Essentials', user: 'Sarah Johnson', score: '84%', time: '5h ago' },
  { id: 'rq6', title: 'React Hooks Assessment', user: 'John Smith', score: '91%', time: '6h ago' },
  { id: 'rq7', title: 'Git & Version Control Quiz', user: 'Amy Rodriguez', score: '97%', time: '7h ago' },
  { id: 'rq8', title: 'REST API Design Quiz', user: 'Chris Lee', score: '73%', time: '8h ago' },
  { id: 'rq9', title: 'JavaScript Fundamentals Quiz', user: 'Rachel Kim', score: '89%', time: '9h ago' },
  { id: 'rq10', title: 'CSS Grid & Flexbox Quiz', user: 'Tom Martinez', score: '82%', time: '10h ago' },
];

const recentLessons = [
  { title: 'Introduction to React', user: 'John Smith', time: '1h ago' },
  { title: 'Advanced JavaScript', user: 'Sarah Johnson', time: '2h ago' },
  { title: 'CSS Fundamentals', user: 'Mike Davis', time: '3h ago' },
  { title: 'State Management with Redux', user: 'Emily Chen', time: '4h ago' },
  { title: 'Building REST APIs', user: 'David Wilson', time: '5h ago' },
  { title: 'TypeScript for Beginners', user: 'Lisa Anderson', time: '6h ago' },
  { title: 'Responsive Web Design', user: 'Amy Rodriguez', time: '7h ago' },
  { title: 'Git Workflow Best Practices', user: 'Chris Lee', time: '8h ago' },
  { title: 'Testing with Jest', user: 'Rachel Kim', time: '9h ago' },
  { title: 'Docker Fundamentals', user: 'Tom Martinez', time: '10h ago' },
];

const timePeriods = ['Today', 'Yesterday', 'Last 7 days', 'Last 14 days', 'Last 30 days'];

type ContentType = 'tasklist' | 'folder' | 'course' | 'lesson' | 'quiz';

interface ContentItem {
  id: string;
  name: string;
  type: ContentType;
}

const contentTypeIcons: Record<ContentType, React.ReactNode> = {
  tasklist: <OrderedListOutlined className="text-blue-600" />,
  folder: <FolderOpenOutlined className="text-amber-600" />,
  course: <BookOutlined className="text-purple-600" />,
  lesson: <FileTextOutlined className="text-green-600" />,
  quiz: <QuestionCircleOutlined className="text-red-500" />,
};

const contentTypeLabels: Record<ContentType, string> = {
  tasklist: 'Tasklist',
  folder: 'Folder',
  course: 'Course',
  lesson: 'Lesson',
  quiz: 'Quiz',
};

const mockContent: ContentItem[] = [
  { id: 'c1', name: 'React Fundamentals', type: 'course' },
  { id: 'c2', name: 'Advanced JavaScript', type: 'course' },
  { id: 'c3', name: 'CSS Mastery', type: 'course' },
  { id: 'l1', name: 'Intro to Hooks', type: 'lesson' },
  { id: 'l2', name: 'State Management Patterns', type: 'lesson' },
  { id: 'l3', name: 'Responsive Design Basics', type: 'lesson' },
  { id: 'q1', name: 'React Hooks Assessment', type: 'quiz' },
  { id: 'q2', name: 'CSS Grid Quiz', type: 'quiz' },
  { id: 'q3', name: 'JavaScript Fundamentals Quiz', type: 'quiz' },
  { id: 'f1', name: 'Frontend Development', type: 'folder' },
  { id: 'f2', name: 'Backend Essentials', type: 'folder' },
  { id: 't1', name: 'Onboarding Checklist', type: 'tasklist' },
  { id: 't2', name: 'Certification Pathway', type: 'tasklist' },
];

type AssigneeType = 'learner' | 'group' | 'attribute';

interface Assignee {
  id: string;
  name: string;
  type: AssigneeType;
  detail?: string;
}

const assigneeTypeIcons: Record<AssigneeType, React.ReactNode> = {
  learner: <UserOutlined className="text-blue-600" />,
  group: <TeamOutlined className="text-purple-600" />,
  attribute: <TagOutlined className="text-amber-600" />,
};

const mockAssignees: Assignee[] = [
  { id: 'u1', name: 'John Smith', type: 'learner', detail: 'john.smith@example.com' },
  { id: 'u2', name: 'Sarah Johnson', type: 'learner', detail: 'sarah.j@example.com' },
  { id: 'u3', name: 'Emily Chen', type: 'learner', detail: 'emily.c@example.com' },
  { id: 'u4', name: 'David Wilson', type: 'learner', detail: 'david.w@example.com' },
  { id: 'u5', name: 'Lisa Anderson', type: 'learner', detail: 'lisa.a@example.com' },
  { id: 'g1', name: 'Engineering Team', type: 'group', detail: '12 members' },
  { id: 'g2', name: 'Design Team', type: 'group', detail: '8 members' },
  { id: 'g3', name: 'New Hires 2026', type: 'group', detail: '15 members' },
  { id: 'g4', name: 'Marketing', type: 'group', detail: '10 members' },
  { id: 'a1', name: 'Department = Engineering', type: 'attribute', detail: '45 users' },
  { id: 'a2', name: 'Role = Junior', type: 'attribute', detail: '23 users' },
  { id: 'a3', name: 'Location = Remote', type: 'attribute', detail: '67 users' },
  { id: 'a4', name: 'Start Date > 2026-01-01', type: 'attribute', detail: '18 users' },
];

function StatCard({ label, value, change, onClick }: { label: string; value: string; change: string; onClick?: () => void }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      onClick={onClick}
      className={`bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left ${onClick ? 'cursor-pointer' : ''}`}
    >
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </Tag>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'lesson'>('quiz');
  const [timePeriod, setTimePeriod] = useState('Last 7 days');
  const [showDropdown, setShowDropdown] = useState(false);
  const [createContentOpen, setCreateContentOpen] = useState(false);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', role: 'Learner' });
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignStep, setAssignStep] = useState<1 | 2>(1);
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [contentSearch, setContentSearch] = useState('');
  const [assigneeSearch, setAssigneeSearch] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState<ContentType | 'all'>('all');
  const [assigneeTypeFilter, setAssigneeTypeFilter] = useState<AssigneeType | 'all'>('all');
  const navigate = useNavigate();

  const resetAssign = () => {
    setAssignOpen(false);
    setAssignStep(1);
    setSelectedContent([]);
    setSelectedAssignees([]);
    setContentSearch('');
    setAssigneeSearch('');
    setContentTypeFilter('all');
    setAssigneeTypeFilter('all');
  };

  const filteredContent = mockContent.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(contentSearch.toLowerCase());
    const matchesType = contentTypeFilter === 'all' || c.type === contentTypeFilter;
    return matchesSearch && matchesType;
  });

  const filteredAssignees = mockAssignees.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(assigneeSearch.toLowerCase());
    const matchesType = assigneeTypeFilter === 'all' || a.type === assigneeTypeFilter;
    return matchesSearch && matchesType;
  });

  const toggleContent = (id: string) => {
    setSelectedContent((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleAssignee = (id: string) => {
    setSelectedAssignees((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleFlowClick = (flow: FlowItem) => {
    if (flow.action === 'assignContent') {
      setAssignOpen(true);
    } else if (flow.action === 'createContent') {
      setCreateContentOpen(true);
    } else if (flow.action === 'bulkUpload') {
      setBulkUploadOpen(true);
    } else if (flow.action === 'createUser') {
      setCreateUserOpen(true);
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

      {/* Quick Action Cards */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* User Management */}
        <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white p-3 w-full md:w-[500px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
              <UserOutlined className="text-blue-600 text-xs" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">User Management</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {userFlows.map((flow) => {
              const Icon = flow.icon;
              return (
                <button
                  key={flow.title}
                  onClick={() => handleFlowClick(flow)}
                  className="flex flex-col items-center justify-center gap-1.5 p-2.5 h-[88px] bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all group text-center"
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
        <div className="rounded-lg border border-purple-100 bg-gradient-to-br from-purple-50/60 to-white p-3 w-full md:w-[380px]">
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
                  className="flex flex-col items-center justify-center gap-1.5 p-2.5 h-[88px] bg-white rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all group text-center"
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <button onClick={() => navigate('/analytics/total-users')} className="bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 p-3 hover:shadow-lg transition-shadow text-left cursor-pointer">
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
        <button onClick={() => navigate('/analytics/active-content')} className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100 p-3 hover:shadow-lg transition-shadow text-left cursor-pointer">
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
        <button onClick={() => navigate('/analytics/completion-rate')} className="bg-gradient-to-br from-amber-50 to-white rounded-lg border border-amber-100 p-3 hover:shadow-lg transition-shadow text-left cursor-pointer">
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
                <StatCard key={s.label} label={s.label} value={s.value} change={s.change} onClick={() => navigate(s.path)} />
              ))}
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Recent Quiz Completions</h3>
            <div className="space-y-2">
              {recentQuizzes.map((quiz) => (
                <button
                  key={quiz.id}
                  onClick={() => navigate(`/analytics/quizzes/result/${quiz.id}`)}
                  className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all text-left cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-base truncate group-hover:text-blue-600 transition-colors">{quiz.title}</p>
                    <p className="text-sm text-gray-600">{quiz.user}</p>
                  </div>
                  <div className="text-right ml-4 flex items-center gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{quiz.score}</p>
                      <p className="text-sm text-gray-500">{quiz.time}</p>
                    </div>
                    <RightOutlined className="text-[10px] text-gray-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content — Lesson */}
        {activeTab === 'lesson' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {lessonStats.map((s) => (
                <StatCard key={s.label} label={s.label} value={s.value} change={s.change} onClick={() => navigate(s.path)} />
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

      {/* Assign Content Modal */}
      {assignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40" onClick={resetAssign} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 mb-1">
              {assignStep === 2 && (
                <button onClick={() => setAssignStep(1)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <LeftOutlined />
                </button>
              )}
              <h3 className="text-xl font-semibold text-gray-900">
                {assignStep === 1 ? 'Select Content' : 'Assign To'}
              </h3>
              <div className="ml-auto flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${assignStep === 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                <span className={`w-2 h-2 rounded-full ${assignStep === 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {assignStep === 1
                ? 'Choose the content you want to assign'
                : `Assigning ${selectedContent.length} item${selectedContent.length !== 1 ? 's' : ''} — choose who to assign to`}
            </p>

            {/* Step 1: Select Content */}
            {assignStep === 1 && (
              <>
                {/* Search + filter */}
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 relative">
                    <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      value={contentSearch}
                      onChange={(e) => setContentSearch(e.target.value)}
                      placeholder="Search content..."
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={contentTypeFilter}
                    onChange={(e) => setContentTypeFilter(e.target.value as ContentType | 'all')}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    {(Object.keys(contentTypeLabels) as ContentType[]).map((t) => (
                      <option key={t} value={t}>{contentTypeLabels[t]}</option>
                    ))}
                  </select>
                </div>

                {/* Content list */}
                <div className="flex-1 overflow-y-auto space-y-1 min-h-0 mb-4">
                  {filteredContent.map((item) => {
                    const isSelected = selectedContent.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleContent(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                          isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          {contentTypeIcons[item.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">{contentTypeLabels[item.type]}</p>
                        </div>
                        {isSelected && <CheckCircleFilled className="text-blue-600" />}
                      </button>
                    );
                  })}
                  {filteredContent.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-6">No content found</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setAssignStep(2)}
                    disabled={selectedContent.length === 0}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      selectedContent.length > 0
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next — Select Recipients ({selectedContent.length})
                  </button>
                  <button onClick={resetAssign} className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Select Assignees */}
            {assignStep === 2 && (
              <>
                {/* Search + filter */}
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 relative">
                    <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      value={assigneeSearch}
                      onChange={(e) => setAssigneeSearch(e.target.value)}
                      placeholder="Search learners, groups, attributes..."
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={assigneeTypeFilter}
                    onChange={(e) => setAssigneeTypeFilter(e.target.value as AssigneeType | 'all')}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="learner">Learners</option>
                    <option value="group">Groups</option>
                    <option value="attribute">Attributes</option>
                  </select>
                </div>

                {/* Assignee list */}
                <div className="flex-1 overflow-y-auto space-y-1 min-h-0 mb-4">
                  {filteredAssignees.map((item) => {
                    const isSelected = selectedAssignees.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleAssignee(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                          isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          {assigneeTypeIcons[item.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          {item.detail && <p className="text-xs text-gray-500">{item.detail}</p>}
                        </div>
                        {isSelected && <CheckCircleFilled className="text-blue-600" />}
                      </button>
                    );
                  })}
                  {filteredAssignees.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-6">No results found</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={resetAssign}
                    disabled={selectedAssignees.length === 0}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      selectedAssignees.length > 0
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Assign ({selectedAssignees.length})
                  </button>
                  <button onClick={resetAssign} className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {bulkUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40" onClick={() => { setBulkUploadOpen(false); setUploadedFile(null); setDragOver(false); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Bulk Upload Users</h3>
            <p className="text-sm text-gray-500 mb-6">Upload a CSV file with user data (first name, last name, email, role)</p>

            {!uploadedFile ? (
              <label
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file && file.name.endsWith('.csv')) setUploadedFile(file);
                }}
                className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                  dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <UploadOutlined className="text-blue-600 text-xl" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">Drop your CSV file here</p>
                  <p className="text-xs text-gray-500 mt-1">or click to browse</p>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setUploadedFile(file);
                  }}
                />
              </label>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FileAddOutlined className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setBulkUploadOpen(false); setUploadedFile(null); }}
                disabled={!uploadedFile}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  uploadedFile
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Upload & Import
              </button>
              <button
                onClick={() => { setBulkUploadOpen(false); setUploadedFile(null); }}
                className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {createUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40" onClick={() => setCreateUserOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Create User</h3>
            <p className="text-sm text-gray-500 mb-6">Add a new user to the system</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    placeholder="Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="john.smith@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="Learner">Learner</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setCreateUserOpen(false);
                  setNewUser({ firstName: '', lastName: '', email: '', role: 'Learner' });
                }}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Create User
              </button>
              <button
                onClick={() => {
                  setCreateUserOpen(false);
                  setNewUser({ firstName: '', lastName: '', email: '', role: 'Learner' });
                }}
                className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
