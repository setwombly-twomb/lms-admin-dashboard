import type { User } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', groups: ['Engineering', 'Leadership'], lastActive: '2025-01-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Instructor', status: 'Active', groups: ['Engineering'], lastActive: '2025-01-14' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com', role: 'Learner', status: 'Active', groups: ['Marketing'], lastActive: '2025-01-13' },
  { id: '4', name: 'Dan Wilson', email: 'dan@example.com', role: 'Learner', status: 'Inactive', groups: ['Sales'], lastActive: '2024-12-20' },
  { id: '5', name: 'Eva Martinez', email: 'eva@example.com', role: 'Instructor', status: 'Active', groups: ['Engineering', 'Design'], lastActive: '2025-01-15' },
  { id: '6', name: 'Frank Lee', email: 'frank@example.com', role: 'Learner', status: 'Active', groups: ['Marketing', 'Sales'], lastActive: '2025-01-12' },
  { id: '7', name: 'Grace Kim', email: 'grace@example.com', role: 'Learner', status: 'Active', groups: ['Design'], lastActive: '2025-01-11' },
  { id: '8', name: 'Henry Brown', email: 'henry@example.com', role: 'Learner', status: 'Inactive', groups: ['Engineering'], lastActive: '2024-11-05' },
  { id: '9', name: 'Irene Chen', email: 'irene@example.com', role: 'Admin', status: 'Active', groups: ['Leadership'], lastActive: '2025-01-15' },
  { id: '10', name: 'Jack Taylor', email: 'jack@example.com', role: 'Learner', status: 'Active', groups: ['Sales'], lastActive: '2025-01-10' },
  { id: '11', name: 'Karen White', email: 'karen@example.com', role: 'Learner', status: 'Active', groups: ['Marketing'], lastActive: '2025-01-09' },
  { id: '12', name: 'Leo Garcia', email: 'leo@example.com', role: 'Instructor', status: 'Active', groups: ['Engineering'], lastActive: '2025-01-14' },
];
