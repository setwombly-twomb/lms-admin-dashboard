import type { Course } from '../types';

export const mockCourses: Course[] = [
  { id: '1', name: 'React Fundamentals', description: 'Learn the basics of React including components, hooks, and state management.', category: 'Development', status: 'Published', enrolledUsers: 145, createdDate: '2024-09-01' },
  { id: '2', name: 'Advanced TypeScript', description: 'Deep dive into TypeScript generics, utility types, and advanced patterns.', category: 'Development', status: 'Published', enrolledUsers: 89, createdDate: '2024-10-15' },
  { id: '3', name: 'UX Design Principles', description: 'Core principles of user experience design and usability testing.', category: 'Design', status: 'Published', enrolledUsers: 67, createdDate: '2024-08-20' },
  { id: '4', name: 'Data Analytics 101', description: 'Introduction to data analytics, visualization, and reporting.', category: 'Data', status: 'Draft', enrolledUsers: 0, createdDate: '2025-01-05' },
  { id: '5', name: 'Project Management', description: 'Agile and waterfall methodologies for effective project delivery.', category: 'Management', status: 'Published', enrolledUsers: 112, createdDate: '2024-07-10' },
  { id: '6', name: 'Cybersecurity Basics', description: 'Foundation course covering network security, encryption, and threat detection.', category: 'Security', status: 'Published', enrolledUsers: 54, createdDate: '2024-11-01' },
  { id: '7', name: 'Machine Learning Intro', description: 'Supervised and unsupervised learning algorithms with Python.', category: 'Data', status: 'Draft', enrolledUsers: 0, createdDate: '2025-01-10' },
  { id: '8', name: 'Leadership Skills', description: 'Develop leadership competencies for team management and decision-making.', category: 'Management', status: 'Published', enrolledUsers: 78, createdDate: '2024-06-15' },
  { id: '9', name: 'Cloud Architecture', description: 'AWS and Azure cloud infrastructure design patterns.', category: 'Development', status: 'Published', enrolledUsers: 96, createdDate: '2024-09-20' },
  { id: '10', name: 'Technical Writing', description: 'Write clear documentation, API guides, and technical specifications.', category: 'Communication', status: 'Published', enrolledUsers: 43, createdDate: '2024-12-01' },
];
