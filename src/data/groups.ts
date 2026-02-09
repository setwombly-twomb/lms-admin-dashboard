import type { Group } from '../types';

export const mockGroups: Group[] = [
  { id: '1', name: 'Engineering', description: 'Software engineering team', memberCount: 5, createdDate: '2024-01-15', members: ['1', '2', '5', '8', '12'] },
  { id: '2', name: 'Marketing', description: 'Marketing and communications', memberCount: 3, createdDate: '2024-02-10', members: ['3', '6', '11'] },
  { id: '3', name: 'Sales', description: 'Sales and business development', memberCount: 3, createdDate: '2024-03-05', members: ['4', '6', '10'] },
  { id: '4', name: 'Design', description: 'UX/UI design team', memberCount: 2, createdDate: '2024-04-20', members: ['5', '7'] },
  { id: '5', name: 'Leadership', description: 'Management and leadership', memberCount: 2, createdDate: '2024-01-01', members: ['1', '9'] },
  { id: '6', name: 'Data Science', description: 'Data analytics and ML team', memberCount: 0, createdDate: '2024-08-15', members: [] },
];
