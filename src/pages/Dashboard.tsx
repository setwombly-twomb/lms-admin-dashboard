import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { mockUsers } from '../data/users';
import { mockGroups } from '../data/groups';
import { mockAttributes } from '../data/attributes';
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
  FilterOutlined,
  PlusOutlined,
  CheckOutlined,
  EllipsisOutlined,
  EditOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  BellOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

interface FlowItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  action?: string;
  style: string;
  iconClass: string;
  variant?: 'dashed' | 'outline';
}

const quickActions: FlowItem[] = [
  { title: 'Create Content', icon: PlusOutlined, action: 'createContent', style: 'bg-blue-50 border-blue-200 hover:bg-blue-100', iconClass: 'text-blue-600' },
  { title: 'Assign Content', icon: CheckOutlined, action: 'assignContent', style: 'bg-blue-50 border-blue-200 hover:bg-blue-100', iconClass: 'text-blue-600' },
  { title: 'Export Lessons & Quizzes', icon: DownloadOutlined, path: '/export', style: 'bg-blue-50 border-blue-200 hover:bg-blue-100', iconClass: 'text-blue-600' },
  { title: 'Create User', icon: UserAddOutlined, action: 'createUser', style: 'bg-green-50 border-green-200 hover:bg-green-100', iconClass: 'text-green-600' },
  { title: 'Manage Groups', icon: TeamOutlined, path: '/groups', style: 'bg-green-50 border-green-200 hover:bg-green-100', iconClass: 'text-green-600' },
  { title: 'Manage Attributes', icon: SettingOutlined, path: '/attributes', style: 'bg-green-50 border-green-200 hover:bg-green-100', iconClass: 'text-green-600' },
  { title: 'Bulk Import', icon: UploadOutlined, action: 'bulkUpload', style: 'bg-green-50 border-green-200 hover:bg-green-100', iconClass: 'text-green-600' },
];

interface ActionItem {
  id: string;
  type: 'grading' | 'deadline' | 'inactive';
  message: string;
  detail: string;
  time: string;
  actionLabel: string;
  actionPath: string;
}

const initialActionItems: ActionItem[] = [
  { id: '1', type: 'grading', message: '5 quizzes need manual grading', detail: 'React Hooks Assessment — 3 submissions, CSS Grid Quiz — 2 submissions', time: '10 min ago', actionLabel: 'Review', actionPath: '/analytics/quizzes' },
  { id: '2', type: 'deadline', message: '8 users have due dates in the next 48 hours', detail: 'John Smith, Sarah Johnson, and 6 others have incomplete lessons', time: '30 min ago', actionLabel: 'View Users', actionPath: '/users' },
  { id: '3', type: 'inactive', message: '3 users have no activity on overdue assignments', detail: 'Mike Davis (5 days), Lisa Anderson (3 days), David Wilson (4 days)', time: '1 hr ago', actionLabel: 'Send Reminder', actionPath: '/users' },
  { id: '4', type: 'grading', message: '2 essay submissions awaiting review', detail: 'Technical Writing course — final project submissions', time: '2 hr ago', actionLabel: 'Review', actionPath: '/courses' },
  { id: '5', type: 'deadline', message: '12 users approaching course deadlines', detail: 'CSS Mastery, React Fundamentals, and Advanced JavaScript courses', time: '3 hr ago', actionLabel: 'View Details', actionPath: '/users' },
];

const actionIcons: Record<string, React.ReactNode> = {
  grading: <EditOutlined className="text-orange-500" />,
  deadline: <ClockCircleOutlined className="text-red-500" />,
  inactive: <WarningOutlined className="text-amber-500" />,
};

const actionColors: Record<string, string> = {
  grading: 'border-l-orange-400 bg-orange-50/50',
  deadline: 'border-l-red-400 bg-red-50/50',
  inactive: 'border-l-amber-400 bg-amber-50/50',
};

type RecentActivityType = 'editing' | 'analytics' | 'assigning' | 'users';

interface RecentActivity {
  id: string;
  type: RecentActivityType;
  title: string;
  detail: string;
  time: string;
  path: string;
}

const recentActivities: RecentActivity[] = [
  { id: 'ra1', type: 'editing', title: 'Editing "React Hooks Assessment"', detail: 'Quiz — 8 of 12 questions drafted', time: '12 min ago', path: '/courses' },
  { id: 'ra2', type: 'analytics', title: 'Viewing Quiz Performance', detail: 'Filtered by Engineering department', time: '45 min ago', path: '/analytics/quizzes' },
  { id: 'ra3', type: 'assigning', title: 'Assigning "CSS Mastery" course', detail: '3 of 5 groups selected', time: '2 hr ago', path: '/courses' },
  { id: 'ra4', type: 'users', title: 'Managing user permissions', detail: 'Updated roles for 4 users in Sales team', time: '3 hr ago', path: '/users' },
  { id: 'ra5', type: 'editing', title: 'Creating "TypeScript Advanced Patterns"', detail: 'Course — 2 of 6 lessons added', time: '5 hr ago', path: '/courses' },
  { id: 'ra6', type: 'analytics', title: 'Viewing Lesson Progress', detail: 'Reviewing completion rates for New Hires', time: 'Yesterday', path: '/analytics/lessons' },
];

const activityIcons: Record<RecentActivityType, React.ReactNode> = {
  editing: <FileAddOutlined className="text-purple-500" />,
  analytics: <BarChartOutlined className="text-emerald-500" />,
  assigning: <CheckOutlined className="text-blue-500" />,
  users: <UserOutlined className="text-green-500" />,
};

const activityColors: Record<RecentActivityType, string> = {
  editing: 'border-l-purple-400 bg-purple-50/50',
  analytics: 'border-l-emerald-400 bg-emerald-50/50',
  assigning: 'border-l-blue-400 bg-blue-50/50',
  users: 'border-l-green-400 bg-green-50/50',
};

const selectAttributes = mockAttributes.filter((a) => a.type === 'Select' && a.appliedTo === 'User');

const attributeUserMap: Record<string, Record<string, string[]>> = {
  Department: {
    Engineering: ['1', '2', '5', '8', '12'],
    Marketing: ['3', '6', '11'],
    Sales: ['4', '6', '10'],
    Design: ['5', '7'],
    HR: ['9'],
  },
  'Skill Level': {
    Beginner: ['4', '8', '10'],
    Intermediate: ['3', '6', '7', '11'],
    Advanced: ['1', '2', '5', '12'],
    Expert: ['9'],
  },
};

const recentQuizzes = [
  { id: 'rq1', title: 'JavaScript Fundamentals Quiz', user: 'Emily Chen', score: '92%', scoreNum: 92, time: '1h ago', userId: '5' },
  { id: 'rq2', title: 'React Hooks Assessment', user: 'David Wilson', score: '88%', scoreNum: 88, time: '2h ago', userId: '4' },
  { id: 'rq3', title: 'CSS Grid & Flexbox Quiz', user: 'Lisa Anderson', score: '95%', scoreNum: 95, time: '3h ago', userId: '11' },
  { id: 'rq4', title: 'TypeScript Basics Quiz', user: 'Mike Davis', score: '76%', scoreNum: 76, time: '4h ago', userId: '8' },
  { id: 'rq5', title: 'Node.js Essentials', user: 'Sarah Johnson', score: '84%', scoreNum: 84, time: '5h ago', userId: '1' },
  { id: 'rq6', title: 'React Hooks Assessment', user: 'John Smith', score: '91%', scoreNum: 91, time: '6h ago', userId: '2' },
  { id: 'rq7', title: 'Git & Version Control Quiz', user: 'Amy Rodriguez', score: '97%', scoreNum: 97, time: '7h ago', userId: '7' },
  { id: 'rq8', title: 'REST API Design Quiz', user: 'Chris Lee', score: '73%', scoreNum: 73, time: '8h ago', userId: '6' },
  { id: 'rq9', title: 'JavaScript Fundamentals Quiz', user: 'Rachel Kim', score: '89%', scoreNum: 89, time: '9h ago', userId: '3' },
  { id: 'rq10', title: 'CSS Grid & Flexbox Quiz', user: 'Tom Martinez', score: '82%', scoreNum: 82, time: '10h ago', userId: '12' },
];

const recentLessons = [
  { id: 'rl1', title: 'Introduction to React', user: 'John Smith', time: '1h ago', userId: '2', progress: 100 },
  { id: 'rl2', title: 'Advanced JavaScript', user: 'Sarah Johnson', time: '2h ago', userId: '1', progress: 100 },
  { id: 'rl3', title: 'CSS Fundamentals', user: 'Mike Davis', time: '3h ago', userId: '8', progress: 45 },
  { id: 'rl4', title: 'State Management with Redux', user: 'Emily Chen', time: '4h ago', userId: '5', progress: 72 },
  { id: 'rl5', title: 'Building REST APIs', user: 'David Wilson', time: '5h ago', userId: '4', progress: 38 },
  { id: 'rl6', title: 'TypeScript for Beginners', user: 'Lisa Anderson', time: '6h ago', userId: '11', progress: 100 },
  { id: 'rl7', title: 'Responsive Web Design', user: 'Amy Rodriguez', time: '7h ago', userId: '7', progress: 55 },
  { id: 'rl8', title: 'Git Workflow Best Practices', user: 'Chris Lee', time: '8h ago', userId: '6', progress: 100 },
  { id: 'rl9', title: 'Testing with Jest', user: 'Rachel Kim', time: '9h ago', userId: '3', progress: 80 },
  { id: 'rl10', title: 'Docker Fundamentals', user: 'Tom Martinez', time: '10h ago', userId: '12', progress: 100 },
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
  const [actionItems, setActionItems] = useState(initialActionItems);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [notifTab, setNotifTab] = useState<'actions' | 'system' | 'history'>('actions');
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
  const [analyticsGroup, setAnalyticsGroup] = useState<string | undefined>();
  const [analyticsUsers, setAnalyticsUsers] = useState<string[]>([]);
  const [analyticsAttrName, setAnalyticsAttrName] = useState<string | undefined>();
  const [analyticsAttrValue, setAnalyticsAttrValue] = useState<string | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = notifPanelOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [notifPanelOpen]);

  const selectedAttr = selectAttributes.find((a) => a.name === analyticsAttrName);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (analyticsAttrName && analyticsAttrValue) count++;
    if (analyticsGroup) count++;
    if (analyticsUsers.length > 0) count++;
    return count;
  }, [analyticsAttrName, analyticsAttrValue, analyticsGroup, analyticsUsers]);

  const clearAllFilters = () => {
    setAnalyticsAttrName(undefined);
    setAnalyticsAttrValue(undefined);
    setAnalyticsGroup(undefined);
    setAnalyticsUsers([]);
  };

  const filteredUserIds = useMemo(() => {
    let ids: Set<string> | null = null;

    if (analyticsGroup) {
      const group = mockGroups.find((g) => g.name === analyticsGroup);
      if (group) ids = new Set(group.members);
    }

    if (analyticsAttrName && analyticsAttrValue) {
      const attrIds = new Set(attributeUserMap[analyticsAttrName]?.[analyticsAttrValue] ?? []);
      ids = ids ? new Set([...ids].filter((id) => attrIds.has(id))) : attrIds;
    }

    if (analyticsUsers.length > 0) {
      const userSet = new Set(analyticsUsers);
      ids = ids ? new Set([...ids].filter((id) => userSet.has(id))) : userSet;
    }

    return ids;
  }, [analyticsGroup, analyticsAttrName, analyticsAttrValue, analyticsUsers]);

  const filteredQuizzes = useMemo(() => {
    if (!filteredUserIds) return recentQuizzes;
    return recentQuizzes.filter((q) => filteredUserIds.has(q.userId));
  }, [filteredUserIds]);

  const filteredLessons = useMemo(() => {
    if (!filteredUserIds) return recentLessons;
    return recentLessons.filter((l) => filteredUserIds.has(l.userId));
  }, [filteredUserIds]);

  const computedQuizStats = useMemo(() => {
    const count = filteredQuizzes.length;
    const avg = count ? (filteredQuizzes.reduce((s, q) => s + q.scoreNum, 0) / count).toFixed(1) : '0';
    const passing = count ? filteredQuizzes.filter((q) => q.scoreNum >= 70).length : 0;
    const passRate = count ? ((passing / count) * 100).toFixed(1) : '0';
    return [
      { label: 'Completions', value: count.toLocaleString(), change: '+12%', path: '/analytics/quizzes/completions' },
      { label: 'Avg Score', value: `${avg}%`, change: '+3.2%', path: '/analytics/quizzes/scores' },
      { label: 'Pass Rate', value: `${passRate}%`, change: '+5.1%', path: '/analytics/quizzes/pass-rate' },
    ];
  }, [filteredQuizzes]);

  const computedLessonStats = useMemo(() => {
    const inProgress = filteredLessons.filter((l) => l.progress < 100).length;
    const completed = filteredLessons.filter((l) => l.progress >= 100).length;
    const avgProgress = filteredLessons.length ? (filteredLessons.reduce((s, l) => s + l.progress, 0) / filteredLessons.length).toFixed(1) : '0';
    return [
      { label: 'In Progress', value: String(inProgress), change: '+18%', path: '/analytics/lessons/in-progress' },
      { label: 'Completed', value: String(completed), change: '+24', path: '/analytics/lessons/completed' },
      { label: 'Avg Progress', value: `${avgProgress}%`, change: '+4.5%', path: '/analytics/lessons/progress' },
    ];
  }, [filteredLessons]);

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
      <div className="mb-5 sm:mb-8 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-5">
          Let's get started, what would you like to do?
        </h2>
        <div className="flex flex-wrap justify-center gap-2.5">
          {quickActions.map((flow) => {
            const Icon = flow.icon;
            const borderClass = flow.variant === 'dashed'
              ? 'border-dashed border-gray-400'
              : flow.variant === 'outline'
                ? 'border border-gray-300'
                : `border ${flow.style}`;
            return (
              <button
                key={flow.title}
                onClick={() => handleFlowClick(flow)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium text-gray-800 ${borderClass} ${flow.style}`}
              >
                <Icon className={flow.iconClass} />
                <span>{flow.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Where You Left Off + Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 items-stretch">
        {/* Continue Where You Left Off */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Continue where you left off</h3>
            <InfoCircleOutlined className="text-gray-400 text-xs" />
          </div>
          <div
            className="flex-1 rounded-2xl p-5 flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #a8c5bf 0%, #8fb3ac 20%, #6f918b 45%, #89b0a8 65%, #b5d1cb 85%, #c8ddd8 100%)',
            }}
          >
            {/* Soft glow overlays */}
            <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(111,145,139,0.6) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(168,197,191,0.7) 0%, transparent 50%)' }} />
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 80% 80%, rgba(200,221,216,0.6) 0%, transparent 50%)' }} />

            {/* Activity cards */}
            <div className="relative z-10 flex flex-col gap-2.5 w-full sm:w-4/5">
              {recentActivities.slice(0, 3).map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => navigate(activity.path)}
                  className="w-full flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm hover:bg-white hover:shadow-md transition-all text-left group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                  <RightOutlined className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Items */}
        {actionItems.length > 0 && (
          <div className="flex flex-col lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BellOutlined className="text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-900">Action Items</h3>
                <span className="text-xs text-gray-400">{actionItems.length} pending</span>
              </div>
              <button
                onClick={() => setNotifPanelOpen(true)}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors"
              >
                View All
              </button>
            </div>
            <div className="space-y-1.5 flex-1">
              {actionItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className={`border-l-4 rounded-lg px-4 py-2.5 min-h-[72px] ${actionColors[item.type]} transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      {actionIcons[item.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{item.message}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-xs text-gray-400">{item.time}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(item.actionPath)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                        >
                          {item.actionLabel} <RightOutlined className="text-[9px]" />
                        </button>
                        <button
                          onClick={() => setActionItems((prev) => prev.filter((x) => x.id !== item.id))}
                          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 px-2.5 py-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <CheckOutlined className="text-[9px]" /> Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Analytics — Full Width */}
      <div className="rounded-xl border border-gray-200 p-4 sm:p-6" style={{ backgroundColor: '#FBF9F7' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <BarChartOutlined className="text-emerald-600" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Reporting</h2>
            <button
              onClick={() => navigate('/analytics/quizzes')}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Go to Analytics <RightOutlined className="text-xs" />
            </button>
          </div>

          {/* Time Period + Filters */}
          <div className="flex items-center gap-2">
            {/* Filters Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm ${
                  activeFilterCount > 0
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <FilterOutlined className={activeFilterCount > 0 ? 'text-emerald-600' : 'text-gray-600'} />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-medium">
                    {activeFilterCount}
                  </span>
                )}
                <DownOutlined className="text-xs" />
              </button>
              {showFilters && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowFilters(false)} />
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-900">Filters</span>
                      {activeFilterCount > 0 && (
                        <button onClick={clearAllFilters} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                          Clear all
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Attribute</label>
                        <Select
                          placeholder="Select attribute"
                          allowClear
                          className="w-full"
                          size="small"
                          value={analyticsAttrName}
                          onChange={(v) => { setAnalyticsAttrName(v); setAnalyticsAttrValue(undefined); }}
                          options={selectAttributes.map((a) => ({ value: a.name, label: a.name }))}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Attribute Value</label>
                        <Select
                          placeholder="Select value"
                          allowClear
                          className="w-full"
                          size="small"
                          value={analyticsAttrValue}
                          disabled={!analyticsAttrName}
                          onChange={setAnalyticsAttrValue}
                          options={(selectedAttr?.options ?? []).map((o) => ({ value: o, label: o }))}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Group</label>
                        <Select
                          placeholder="Select group"
                          allowClear
                          className="w-full"
                          size="small"
                          value={analyticsGroup}
                          onChange={setAnalyticsGroup}
                          options={mockGroups.map((g) => ({ value: g.name, label: g.name }))}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Users</label>
                        <Select
                          mode="multiple"
                          placeholder="Select users"
                          allowClear
                          className="w-full"
                          size="small"
                          value={analyticsUsers}
                          onChange={setAnalyticsUsers}
                          options={mockUsers.map((u) => ({ value: u.id, label: u.name }))}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 sm:mb-6">
          <button onClick={() => navigate('/analytics/total-users')} className="bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-200 p-3 hover:shadow-lg transition-shadow text-left cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-700 mb-0.5">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">2,847</p>
                <p className="text-xs text-green-600 font-medium mt-0.5">+127 this month</p>
              </div>
              <div className="bg-green-100 p-2.5 rounded-lg">
                <UserOutlined className="text-green-600 text-lg" />
              </div>
            </div>
          </button>
          <button onClick={() => navigate('/analytics/active-content')} className="bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200 p-3 hover:shadow-lg transition-shadow text-left cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-700 mb-0.5">Active Content</p>
                <p className="text-2xl font-semibold text-gray-900">162</p>
                <p className="text-xs text-blue-600 font-medium mt-0.5">+8 this month</p>
              </div>
              <div className="bg-blue-100 p-2.5 rounded-lg">
                <FolderOpenOutlined className="text-blue-600 text-lg" />
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

        {/* Tabs */}
        <div className="flex gap-4 mb-4 sm:mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-1 pb-2 sm:pb-3 font-medium text-sm sm:text-base transition-colors ${
              activeTab === 'quiz'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Quiz Performance
          </button>
          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-1 pb-2 sm:pb-3 font-medium text-sm sm:text-base transition-colors ${
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
              {computedQuizStats.map((s) => (
                <StatCard key={s.label} label={s.label} value={s.value} change={s.change} onClick={() => navigate(s.path)} />
              ))}
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Recent Quiz Completions</h3>
            <div className="space-y-0 divide-y divide-gray-100">
              {filteredQuizzes.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">No quiz completions match the selected filters</p>
              )}
              {filteredQuizzes.map((quiz) => (
                <button
                  key={quiz.id}
                  onClick={() => navigate(`/analytics/quizzes/result/${quiz.id}`)}
                  className="w-full flex items-center gap-3 py-2 px-1 hover:bg-white/60 transition-all text-left cursor-pointer group"
                >
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <p className="text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">{quiz.user}</p>
                    <span className="text-xs text-gray-400 truncate flex-shrink min-w-0">{quiz.title}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-semibold text-gray-900">{quiz.score}</span>
                    <span className="text-xs text-gray-400">{quiz.time}</span>
                    <RightOutlined className="text-[9px] text-gray-300 group-hover:text-blue-400 transition-colors hidden sm:block" />
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
              {computedLessonStats.map((s) => (
                <StatCard key={s.label} label={s.label} value={s.value} change={s.change} onClick={() => navigate(s.path)} />
              ))}
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Recent Lesson Completions</h3>
            <div className="space-y-0 divide-y divide-gray-100">
              {filteredLessons.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">No lesson completions match the selected filters</p>
              )}
              {filteredLessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center gap-3 py-2 px-1 hover:bg-white/60 transition-all">
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <p className="text-sm text-gray-900 truncate">{lesson.user}</p>
                    <span className="text-xs text-gray-400 truncate flex-shrink min-w-0">{lesson.title}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{lesson.time}</span>
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

      {/* Notifications Slide-Out Panel */}
      {notifPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/30" onClick={() => setNotifPanelOpen(false)} />
          <div className="relative w-full max-w-md bg-white shadow-2xl animate-[slideInRight_0.25s_ease-out] flex flex-col h-full">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <BellOutlined className="text-gray-600 text-lg" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <p className="text-xs text-gray-500">{actionItems.length} actions pending</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActionItems([])}
                    className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                  >
                    Dismiss all
                  </button>
                  <button
                    onClick={() => setNotifPanelOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                  >
                    <CloseOutlined />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 mt-4 border-b border-gray-200 -mb-[1px]">
                {(['actions', 'system', 'history'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setNotifTab(tab)}
                    className={`pb-2.5 text-sm font-medium transition-colors ${
                      notifTab === tab
                        ? 'text-gray-900 border-b-2 border-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'actions' ? 'Actions to take' : tab === 'system' ? 'System' : 'History'}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {notifTab === 'actions' && (
                <>
                  {actionItems.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                        <CheckOutlined className="text-green-500 text-lg" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">All caught up!</p>
                      <p className="text-xs text-gray-500 mt-1">No pending action items</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {actionItems.map((item) => (
                        <div key={item.id} className="px-6 py-5">
                          <div className="flex items-start gap-4">
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              {actionIcons[item.type]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900">{item.message}</p>
                              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.detail}</p>
                              <div className="flex items-center gap-4 mt-3">
                                <button
                                  onClick={() => { navigate(item.actionPath); setNotifPanelOpen(false); }}
                                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                >
                                  {item.actionLabel} <RightOutlined className="text-[10px]" />
                                </button>
                                <button
                                  onClick={() => setActionItems((prev) => prev.filter((x) => x.id !== item.id))}
                                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1.5 transition-colors"
                                >
                                  <CheckOutlined className="text-[11px]" /> Dismiss
                                </button>
                                <span className="text-sm text-gray-400 ml-auto">{item.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {notifTab === 'system' && (
                <div className="px-6 py-16 text-center">
                  <p className="text-sm text-gray-400">No system notifications</p>
                </div>
              )}
              {notifTab === 'history' && (
                <div className="px-6 py-16 text-center">
                  <p className="text-sm text-gray-400">No history yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
