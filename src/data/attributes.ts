import type { Attribute } from '../types';

export const mockAttributes: Attribute[] = [
  { id: '1', name: 'Department', type: 'Select', appliedTo: 'User', required: true, options: ['Engineering', 'Marketing', 'Sales', 'Design', 'HR'] },
  { id: '2', name: 'Employee ID', type: 'Text', appliedTo: 'User', required: true },
  { id: '3', name: 'Hire Date', type: 'Date', appliedTo: 'User', required: false },
  { id: '4', name: 'Skill Level', type: 'Select', appliedTo: 'User', required: false, options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  { id: '5', name: 'Credit Hours', type: 'Number', appliedTo: 'Course', required: true },
  { id: '6', name: 'Difficulty', type: 'Select', appliedTo: 'Course', required: true, options: ['Beginner', 'Intermediate', 'Advanced'] },
  { id: '7', name: 'Certification Code', type: 'Text', appliedTo: 'Course', required: false },
  { id: '8', name: 'Expiry Date', type: 'Date', appliedTo: 'Course', required: false },
];
