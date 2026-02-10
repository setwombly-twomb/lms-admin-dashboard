import { useState, useRef, useEffect, useMemo } from 'react';
import {
  UserOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MenuOutlined,
  InfoCircleOutlined,
  DatabaseOutlined,
  BellOutlined,
  EditOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  RightOutlined,
  CheckOutlined,
  SearchOutlined,
  TeamOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  FolderOpenOutlined,
  BookOutlined,
  OrderedListOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

interface Notification {
  id: string;
  type: 'grading' | 'deadline' | 'inactive';
  message: string;
  detail: string;
  time: string;
  actionLabel: string;
  actionPath: string;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'grading', message: '5 quizzes need manual grading', detail: 'React Hooks Assessment — 3 submissions, CSS Grid Quiz — 2 submissions', time: '10 min ago', actionLabel: 'Review', actionPath: '/analytics/quizzes' },
  { id: '2', type: 'deadline', message: '8 users have due dates in the next 48 hours', detail: 'John Smith, Sarah Johnson, and 6 others have incomplete lessons', time: '30 min ago', actionLabel: 'View Users', actionPath: '/users' },
  { id: '3', type: 'inactive', message: '3 users have no activity on overdue assignments', detail: 'Mike Davis (5 days), Lisa Anderson (3 days), David Wilson (4 days)', time: '1 hr ago', actionLabel: 'Send Reminder', actionPath: '/users' },
  { id: '4', type: 'grading', message: '2 essay submissions awaiting review', detail: 'Technical Writing course — final project submissions', time: '2 hr ago', actionLabel: 'Review', actionPath: '/courses' },
  { id: '5', type: 'deadline', message: '12 users approaching course deadlines', detail: 'CSS Mastery, React Fundamentals, and Advanced JavaScript courses', time: '3 hr ago', actionLabel: 'View Details', actionPath: '/users' },
  { id: '6', type: 'grading', message: '4 new quiz submissions to grade', detail: 'JavaScript Fundamentals Quiz — awaiting manual review', time: '4 hr ago', actionLabel: 'Grade Now', actionPath: '/analytics/quizzes' },
  { id: '7', type: 'inactive', message: '5 users inactive for over 7 days', detail: 'Alex Thompson, Rachel Green, and 3 others have not logged in', time: '5 hr ago', actionLabel: 'Send Reminder', actionPath: '/users' },
  { id: '8', type: 'deadline', message: 'Course completion deadline in 24 hours', detail: '15 users need to complete Frontend Development folder', time: '6 hr ago', actionLabel: 'View Users', actionPath: '/courses' },
  { id: '9', type: 'grading', message: '3 assignments pending review', detail: 'Technical Writing and CSS Mastery final assignments', time: '7 hr ago', actionLabel: 'Review', actionPath: '/courses' },
  { id: '10', type: 'inactive', message: '2 users have overdue lessons', detail: 'State Management Patterns and Responsive Design Basics', time: '8 hr ago', actionLabel: 'View Lessons', actionPath: '/analytics/lessons' },
];

const notifIcons: Record<string, React.ReactNode> = {
  grading: <EditOutlined className="text-orange-500" />,
  deadline: <ClockCircleOutlined className="text-red-500" />,
  inactive: <WarningOutlined className="text-amber-500" />,
};

const notifColors: Record<string, string> = {
  grading: 'border-l-orange-400 bg-orange-50/50',
  deadline: 'border-l-red-400 bg-red-50/50',
  inactive: 'border-l-amber-400 bg-amber-50/50',
};

const topNavItems = [
  { key: '/', icon: <AppstoreOutlined className="text-lg" />, label: 'Dashboard' },
  { key: '/users', icon: <UserOutlined className="text-lg" />, label: 'Users' },
  { key: '/courses', icon: <SettingOutlined className="text-lg" />, label: 'Courses' },
  { key: '/analytics/quizzes', icon: <BarChartOutlined className="text-lg" />, label: 'Analytics' },
];

const bottomNavItems = [
  { key: '/groups', icon: <DatabaseOutlined className="text-lg" />, label: 'Groups' },
  { key: '/attributes', icon: <InfoCircleOutlined className="text-lg" />, label: 'Attributes' },
];

type SearchCategory = 'analytics' | 'tasklist' | 'folder' | 'course' | 'lesson' | 'quiz' | 'user' | 'group' | 'attribute';

interface SearchItem {
  id: string;
  label: string;
  category: SearchCategory;
  path: string;
  detail?: string;
}

const searchCategoryIcons: Record<SearchCategory, React.ReactNode> = {
  analytics: <BarChartOutlined className="text-emerald-600" />,
  tasklist: <OrderedListOutlined className="text-blue-600" />,
  folder: <FolderOpenOutlined className="text-amber-600" />,
  course: <BookOutlined className="text-purple-600" />,
  lesson: <FileTextOutlined className="text-green-600" />,
  quiz: <QuestionCircleOutlined className="text-red-500" />,
  user: <UserOutlined className="text-blue-600" />,
  group: <TeamOutlined className="text-purple-600" />,
  attribute: <TagOutlined className="text-amber-600" />,
};

const searchCategoryLabels: Record<SearchCategory, string> = {
  analytics: 'Analytics',
  tasklist: 'Tasklist',
  folder: 'Folder',
  course: 'Course',
  lesson: 'Lesson',
  quiz: 'Quiz',
  user: 'User',
  group: 'Group',
  attribute: 'Attribute',
};

const searchIndex: SearchItem[] = [
  { id: 's1', label: 'Quiz Analytics', category: 'analytics', path: '/analytics/quizzes', detail: 'Quiz performance metrics and charts' },
  { id: 's2', label: 'Lesson Analytics', category: 'analytics', path: '/analytics/lessons', detail: 'Lesson progress and completion metrics' },
  { id: 's3', label: 'Total Users', category: 'analytics', path: '/analytics/total-users', detail: '2,847 users across all roles' },
  { id: 's4', label: 'Active Content', category: 'analytics', path: '/analytics/active-content', detail: '162 published content items' },
  { id: 's5', label: 'Completion Rate', category: 'analytics', path: '/analytics/completion-rate', detail: '78.4% average completion' },
  { id: 's6', label: 'Quiz Completions', category: 'analytics', path: '/analytics/quizzes/completions' },
  { id: 's7', label: 'Quiz Scores', category: 'analytics', path: '/analytics/quizzes/scores' },
  { id: 's8', label: 'Pass Rate Analysis', category: 'analytics', path: '/analytics/quizzes/pass-rate' },
  { id: 's9', label: 'Onboarding Checklist', category: 'tasklist', path: '/courses', detail: '12 items' },
  { id: 's10', label: 'Certification Pathway', category: 'tasklist', path: '/courses', detail: '8 items' },
  { id: 's11', label: 'Frontend Development', category: 'folder', path: '/courses', detail: '15 items' },
  { id: 's12', label: 'Backend Essentials', category: 'folder', path: '/courses', detail: '10 items' },
  { id: 's13', label: 'React Fundamentals', category: 'course', path: '/courses', detail: '24 enrolled' },
  { id: 's14', label: 'Advanced JavaScript', category: 'course', path: '/courses', detail: '18 enrolled' },
  { id: 's15', label: 'CSS Mastery', category: 'course', path: '/courses', detail: '31 enrolled' },
  { id: 's16', label: 'Technical Writing', category: 'course', path: '/courses', detail: '12 enrolled' },
  { id: 's17', label: 'Intro to Hooks', category: 'lesson', path: '/analytics/lessons', detail: 'React Fundamentals' },
  { id: 's18', label: 'State Management Patterns', category: 'lesson', path: '/analytics/lessons', detail: 'Advanced JavaScript' },
  { id: 's19', label: 'Responsive Design Basics', category: 'lesson', path: '/analytics/lessons', detail: 'CSS Mastery' },
  { id: 's20', label: 'React Hooks Assessment', category: 'quiz', path: '/analytics/quizzes', detail: '92% avg score' },
  { id: 's21', label: 'CSS Grid Quiz', category: 'quiz', path: '/analytics/quizzes', detail: '78% avg score' },
  { id: 's22', label: 'JavaScript Fundamentals Quiz', category: 'quiz', path: '/analytics/quizzes', detail: '85% avg score' },
  { id: 's23', label: 'John Smith', category: 'user', path: '/users', detail: 'john.smith@example.com' },
  { id: 's24', label: 'Sarah Johnson', category: 'user', path: '/users', detail: 'sarah.j@example.com' },
  { id: 's25', label: 'Emily Chen', category: 'user', path: '/users', detail: 'emily.c@example.com' },
  { id: 's26', label: 'David Wilson', category: 'user', path: '/users', detail: 'david.w@example.com' },
  { id: 's27', label: 'Mike Davis', category: 'user', path: '/users', detail: 'mike.d@example.com' },
  { id: 's28', label: 'Engineering Team', category: 'group', path: '/groups', detail: '12 members' },
  { id: 's29', label: 'Design Team', category: 'group', path: '/groups', detail: '8 members' },
  { id: 's30', label: 'New Hires 2026', category: 'group', path: '/groups', detail: '15 members' },
  { id: 's31', label: 'Marketing', category: 'group', path: '/groups', detail: '10 members' },
  { id: 's32', label: 'Department', category: 'attribute', path: '/attributes', detail: 'Text — applied to Users' },
  { id: 's33', label: 'Role Level', category: 'attribute', path: '/attributes', detail: 'Select — applied to Users' },
  { id: 's34', label: 'Location', category: 'attribute', path: '/attributes', detail: 'Text — applied to Users' },
  { id: 's35', label: 'Start Date', category: 'attribute', path: '/attributes', detail: 'Date — applied to Users' },
];

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchHighlight, setSearchHighlight] = useState(0);
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>([
    searchIndex[13], // Advanced JavaScript (course)
    searchIndex[22], // John Smith (user)
    searchIndex[0],  // Quiz Analytics
    searchIndex[27], // Engineering Team (group)
    searchIndex[19], // React Hooks Assessment (quiz)
  ]);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return searchIndex.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.detail && item.detail.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [searchQuery]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    for (const item of searchResults) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [searchResults]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Cmd+K / Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchFocused(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setSearchFocused(false);
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectSearchResult = (item: SearchItem) => {
    setRecentSearches((prev) => [item, ...prev.filter((r) => r.id !== item.id)].slice(0, 5));
    navigate(item.path);
    setSearchQuery('');
    setSearchFocused(false);
    setSearchHighlight(0);
    searchInputRef.current?.blur();
  };

  const removeRecent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSearchHighlight((prev) => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSearchHighlight((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && searchResults[searchHighlight]) {
      selectSearchResult(searchResults[searchHighlight]);
    }
  };

  const isActive = (key: string) => {
    if (key === '/') return location.pathname === '/';
    return location.pathname.startsWith(key);
  };

  const NavButton = ({ item }: { item: { key: string; icon: React.ReactNode; label: string } }) => (
    <Tooltip title={item.label} placement="right">
      <button
        onClick={() => {
          navigate(item.key);
          setMobileOpen(false);
        }}
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:scale-110 ${
          isActive(item.key)
            ? 'bg-gray-900 text-white'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        {item.icon}
      </button>
    </Tooltip>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Thin Icon Sidebar */}
      <div
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-6
          transition-transform duration-200
          lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </button>

        {/* Top nav icons */}
        <div className="flex flex-col gap-4 flex-1">
          {topNavItems.map((item) => (
            <NavButton key={item.key} item={item} />
          ))}
        </div>

        {/* Bottom nav icons */}
        <div className="flex flex-col gap-4">
          {bottomNavItems.map((item) => (
            <NavButton key={item.key} item={item} />
          ))}
          <Tooltip title="Profile" placement="right">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors">
              <UserOutlined className="text-lg" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/45 z-40 lg:hidden"
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuOutlined className="text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 flex-shrink-0">Dashboard</h1>

            {/* Global Search — inline bar */}
            {!searchFocused && (
              <div className="flex-1 max-w-xl mx-4 relative hidden md:block">
                <button
                  onClick={() => { setSearchFocused(true); setTimeout(() => searchInputRef.current?.focus(), 50); }}
                  className="w-full flex items-center gap-2 pl-3 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-400 hover:bg-gray-100 hover:border-gray-300 transition-colors text-left"
                >
                  <SearchOutlined className="text-sm" />
                  <span className="flex-1">Search users, courses, quizzes, groups...</span>
                  <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] text-gray-400 font-medium">
                    ⌘K
                  </kbd>
                </button>
              </div>
            )}

            {/* Notification bell + preview pill */}
            <div className="ml-auto flex items-center gap-3" ref={notifRef}>
              {notifications.length > 0 && !notifOpen && (
                <button
                  onClick={() => setNotifOpen(true)}
                  className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full text-left max-w-lg border border-[#37626b]/30 shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all cursor-pointer bg-gradient-to-r from-[#37626b] to-gray-200"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative">
                    <BellOutlined className="text-xs" style={{ color: 'white' }} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-white truncate">{notifications[0].message}</span>
                  <span className="text-xs text-gray-600 flex-shrink-0 font-bold">{notifications[0].time}</span>
                  <RightOutlined className="text-[10px] flex-shrink-0 font-extrabold" style={{ color: '#4b5563' }} />
                </button>
              )}
              {/* Mobile bell icon */}
              <button
                onClick={() => setNotifOpen(true)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <BellOutlined className="text-gray-600 text-lg" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Focus Mode Overlay */}
        {searchFocused && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => { setSearchFocused(false); setSearchQuery(''); }} />
            <div className="relative w-full max-w-2xl mx-4 animate-[slideUp_0.2s_ease-out]" ref={searchRef}>
              {/* Search input */}
              <div className="relative">
                <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setSearchHighlight(0); }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search across everything..."
                  autoFocus
                  className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-t-2xl text-base text-gray-900 placeholder-gray-400 focus:outline-none shadow-2xl"
                />
                <button
                  onClick={() => { setSearchFocused(false); setSearchQuery(''); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 px-2 py-1 bg-gray-100 rounded-md transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Results / Recent */}
              <div className="bg-white border border-t-0 border-gray-200 rounded-b-2xl shadow-2xl overflow-hidden">
                {searchQuery.trim() ? (
                  // Active search results
                  searchResults.length === 0 ? (
                    <div className="px-6 py-10 text-center">
                      <SearchOutlined className="text-3xl text-gray-300 mb-3" />
                      <p className="text-sm text-gray-500">No results for &ldquo;{searchQuery}&rdquo;</p>
                      <p className="text-xs text-gray-400 mt-1">Try searching for users, courses, quizzes, or groups</p>
                    </div>
                  ) : (
                    <div className="max-h-[50vh] overflow-y-auto py-2">
                      {Object.entries(groupedResults).map(([category, items]) => (
                        <div key={category}>
                          <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            {searchCategoryLabels[category as SearchCategory]}
                          </div>
                          {items.map((item) => {
                            const flatIndex = searchResults.indexOf(item);
                            return (
                              <button
                                key={item.id}
                                onClick={() => selectSearchResult(item)}
                                onMouseEnter={() => setSearchHighlight(flatIndex)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                  flatIndex === searchHighlight ? 'bg-blue-50' : 'hover:bg-gray-50'
                                }`}
                              >
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  {searchCategoryIcons[item.category]}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{item.label}</p>
                                  {item.detail && <p className="text-xs text-gray-500 truncate">{item.detail}</p>}
                                </div>
                                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                  {searchCategoryLabels[item.category]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  // Empty state — show recent searches
                  <div className="py-2">
                    {recentSearches.length > 0 ? (
                      <>
                        <div className="px-4 py-2 flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Recent Searches</span>
                          <button
                            onClick={() => setRecentSearches([])}
                            className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            Clear all
                          </button>
                        </div>
                        {recentSearches.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => selectSearchResult(item)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              {searchCategoryIcons[item.category]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.label}</p>
                              {item.detail && <p className="text-xs text-gray-500 truncate">{item.detail}</p>}
                            </div>
                            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                              {searchCategoryLabels[item.category]}
                            </span>
                            <button
                              onClick={(e) => removeRecent(item.id, e)}
                              className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-xs"
                            >
                              ✕
                            </button>
                          </button>
                        ))}
                      </>
                    ) : (
                      <div className="px-6 py-8 text-center">
                        <SearchOutlined className="text-2xl text-gray-300 mb-2" />
                        <p className="text-sm text-gray-500">Start typing to search</p>
                        <p className="text-xs text-gray-400 mt-1">Search across analytics, courses, users, groups, and more</p>
                      </div>
                    )}

                    {/* Quick filters */}
                    <div className="px-4 py-3 border-t border-gray-100">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Quick Filters</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(['user', 'course', 'quiz', 'lesson', 'group', 'attribute'] as SearchCategory[]).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => { setSearchQuery(cat + ' '); searchInputRef.current?.focus(); }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors"
                          >
                            {searchCategoryIcons[cat]}
                            {searchCategoryLabels[cat]}s
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Items modal */}
        {notifOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setNotifOpen(false)} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[57rem] mx-4 animate-[slideUp_0.25s_ease-out]">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <BellOutlined className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Action Items</h3>
                    <p className="text-xs text-gray-500">{notifications.length} pending</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {notifications.length > 0 && (
                    <button
                      onClick={() => setNotifications([])}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Dismiss all
                    </button>
                  )}
                  <button
                    onClick={() => setNotifOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                      <CheckOutlined className="text-green-500 text-lg" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">All caught up!</p>
                    <p className="text-xs text-gray-500 mt-1">No pending action items</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`border-l-4 px-6 py-4 border-b border-gray-50 ${notifColors[n.type]} transition-all hover:brightness-95`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                          {notifIcons[n.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{n.message}</p>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.detail}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() => { navigate(n.actionPath); setNotifOpen(false); }}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                            >
                              {n.actionLabel} <RightOutlined className="text-[10px]" />
                            </button>
                            <button
                              onClick={() => setNotifications((prev) => prev.filter((x) => x.id !== n.id))}
                              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <CheckOutlined className="text-[10px]" /> Dismiss
                            </button>
                            <span className="text-xs text-gray-400 ml-auto">{n.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <Breadcrumbs />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
