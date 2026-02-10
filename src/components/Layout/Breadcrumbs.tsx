import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const nameMap: Record<string, string> = {
  '/courses': 'Courses',
  '/courses/assign': 'Assign',
  '/users': 'Users',
  '/users/import': 'Bulk Import',
  '/groups': 'Groups',
  '/attributes': 'Attributes',
  '/export': 'Export Data',
  '/analytics': 'Analytics',
  '/analytics/total-users': 'Total Users',
  '/analytics/active-content': 'Active Content',
  '/analytics/completion-rate': 'Completion Rate',
  '/analytics/quizzes': 'Quizzes',
  '/analytics/quizzes/completions': 'Completions',
  '/analytics/quizzes/scores': 'Scores',
  '/analytics/quizzes/pass-rate': 'Pass Rate',
  '/analytics/quizzes/result': 'Result',
  '/analytics/lessons': 'Lessons',
  '/analytics/lessons/in-progress': 'In Progress',
  '/analytics/lessons/completed': 'Completed',
  '/analytics/lessons/progress': 'Progress',
};

export default function Breadcrumbs() {
  const location = useLocation();
  if (location.pathname === '/') return null;

  const pathSnippets = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-sm mb-4">
      <Link
        to="/"
        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors font-medium"
      >
        <HomeOutlined className="text-xs" />
        Explore
      </Link>
      {pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const label = nameMap[url] || pathSnippets[index];
        const isLast = index === pathSnippets.length - 1;
        return (
          <span key={url} className="flex items-center gap-2">
            <span className="text-gray-300">/</span>
            {isLast ? (
              <span className="text-gray-500">{label}</span>
            ) : (
              <Link to={url} className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
