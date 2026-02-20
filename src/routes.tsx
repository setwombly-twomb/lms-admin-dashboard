import type { RouteObject } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/courses/CourseList';
import CourseAssign from './pages/courses/CourseAssign';
import UserList from './pages/users/UserList';
import BulkImport from './pages/users/BulkImport';
import GroupList from './pages/groups/GroupList';
import CohortOverview from './pages/groups/CohortOverview';
import TierDetail from './pages/groups/TierDetail';
import AttributeList from './pages/attributes/AttributeList';
import ExportData from './pages/ExportData';
import QuizAnalytics from './pages/analytics/QuizAnalytics';
import LessonAnalytics from './pages/analytics/LessonAnalytics';
import TotalUsers from './pages/analytics/TotalUsers';
import ActiveContent from './pages/analytics/ActiveContent';
import CompletionRate from './pages/analytics/CompletionRate';
import QuizCompletions from './pages/analytics/QuizCompletions';
import QuizScores from './pages/analytics/QuizScores';
import QuizPassRate from './pages/analytics/QuizPassRate';
import LessonsInProgress from './pages/analytics/LessonsInProgress';
import LessonsCompleted from './pages/analytics/LessonsCompleted';
import LessonProgress from './pages/analytics/LessonProgress';
import QuizResultDetail from './pages/analytics/QuizResultDetail';
import LearnerDashboard from './pages/LearnerDashboard';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'learner', element: <LearnerDashboard /> },
      { path: 'courses', element: <CourseList /> },
      { path: 'courses/assign', element: <CourseAssign /> },
      { path: 'users', element: <UserList /> },
      { path: 'users/import', element: <BulkImport /> },
      { path: 'groups', element: <GroupList /> },
      { path: 'groups/:groupId', element: <CohortOverview /> },
      { path: 'groups/:groupId/tier/:tierKey', element: <TierDetail /> },
      { path: 'attributes', element: <AttributeList /> },
      { path: 'export', element: <ExportData /> },
      { path: 'analytics/total-users', element: <TotalUsers /> },
      { path: 'analytics/active-content', element: <ActiveContent /> },
      { path: 'analytics/completion-rate', element: <CompletionRate /> },
      { path: 'analytics/quizzes', element: <QuizAnalytics /> },
      { path: 'analytics/quizzes/completions', element: <QuizCompletions /> },
      { path: 'analytics/quizzes/scores', element: <QuizScores /> },
      { path: 'analytics/quizzes/pass-rate', element: <QuizPassRate /> },
      { path: 'analytics/quizzes/result/:attemptId', element: <QuizResultDetail /> },
      { path: 'analytics/lessons', element: <LessonAnalytics /> },
      { path: 'analytics/lessons/in-progress', element: <LessonsInProgress /> },
      { path: 'analytics/lessons/completed', element: <LessonsCompleted /> },
      { path: 'analytics/lessons/progress', element: <LessonProgress /> },
    ],
  },
];

export default routes;
