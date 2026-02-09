import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const nameMap: Record<string, string> = {
  '/courses': 'Courses',
  '/courses/assign': 'Assign',
  '/users': 'Users',
  '/users/import': 'Bulk Import',
  '/groups': 'Groups',
  '/attributes': 'Attributes',
  '/analytics': 'Analytics',
  '/analytics/quizzes': 'Quizzes',
  '/analytics/lessons': 'Lessons',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(Boolean);

  const items = [
    { title: <Link to="/">Home</Link> },
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const isLast = index === pathSnippets.length - 1;
      return {
        title: isLast ? (nameMap[url] || url) : <Link to={url}>{nameMap[url] || url}</Link>,
      };
    }),
  ];

  return location.pathname === '/' ? null : <Breadcrumb items={items} />;
}
