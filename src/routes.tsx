import type { RouteObject } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/courses/CourseList';
import CourseAssign from './pages/courses/CourseAssign';
import UserList from './pages/users/UserList';
import BulkImport from './pages/users/BulkImport';
import GroupList from './pages/groups/GroupList';
import AttributeList from './pages/attributes/AttributeList';
import QuizAnalytics from './pages/analytics/QuizAnalytics';
import LessonAnalytics from './pages/analytics/LessonAnalytics';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'courses', element: <CourseList /> },
      { path: 'courses/assign', element: <CourseAssign /> },
      { path: 'users', element: <UserList /> },
      { path: 'users/import', element: <BulkImport /> },
      { path: 'groups', element: <GroupList /> },
      { path: 'attributes', element: <AttributeList /> },
      { path: 'analytics/quizzes', element: <QuizAnalytics /> },
      { path: 'analytics/lessons', element: <LessonAnalytics /> },
    ],
  },
];

export default routes;
