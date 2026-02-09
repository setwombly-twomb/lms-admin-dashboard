import { useState, useRef, useEffect } from 'react';
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
} from '@ant-design/icons';
import { Tooltip, Badge } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

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

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>

            {/* Bell icon + preview + dropdown */}
            <div className="relative ml-auto flex items-center gap-3" ref={notifRef}>
              {/* Latest notification preview */}
              {notifications.length > 0 && !notifOpen && (
                <button
                  onClick={() => setNotifOpen(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left max-w-md"
                >
                  <span className="flex-shrink-0">{notifIcons[notifications[0].type]}</span>
                  <span className="text-sm text-gray-700 truncate">{notifications[0].message}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{notifications[0].time}</span>
                </button>
              )}
              <Badge count={notifications.length} size="small" offset={[-2, 2]}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <BellOutlined className="text-gray-600 text-lg" />
                </button>
              </Badge>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Notifications</span>
                    {notifications.length > 0 && (
                      <button
                        onClick={() => setNotifications([])}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Dismiss all
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-gray-400">All caught up!</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`border-l-4 px-4 py-3 border-b border-gray-50 ${notifColors[n.type]} transition-all`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5">{notifIcons[n.type]}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{n.message}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{n.detail}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <button
                                  onClick={() => { navigate(n.actionPath); setNotifOpen(false); }}
                                  className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                >
                                  {n.actionLabel} <RightOutlined className="text-[10px]" />
                                </button>
                                <button
                                  onClick={() => dismissNotification(n.id)}
                                  className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
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
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
