import { useState, useMemo } from 'react';
import { Progress } from 'antd';
import {
  BookOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  OrderedListOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  RightOutlined,
  DownOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { learnerAssignments } from '../data/learnerAssignments';
import type { LearnerAssignment } from '../types';

const typeIcons: Record<LearnerAssignment['type'], React.ReactNode> = {
  folder: <FolderOpenOutlined className="text-amber-600" />,
  course: <BookOutlined className="text-purple-600" />,
  lesson: <FileTextOutlined className="text-green-600" />,
  quiz: <QuestionCircleOutlined className="text-red-500" />,
  tasklist: <OrderedListOutlined className="text-blue-600" />,
};

interface AssignmentNode {
  item: LearnerAssignment;
  children: AssignmentNode[];
}

function buildTree(items: LearnerAssignment[]): AssignmentNode[] {
  const folders = items.filter((a) => a.type === 'folder');
  const courses = items.filter((a) => a.type === 'course');
  const assignedIds = new Set<string>();

  // Map courses to their parent folder (course.courseName === folder.title)
  const folderChildrenMap = new Map<string, LearnerAssignment[]>();
  for (const course of courses) {
    const parentFolder = folders.find((f) => f.title === course.courseName);
    if (parentFolder) {
      const existing = folderChildrenMap.get(parentFolder.id) || [];
      existing.push(course);
      folderChildrenMap.set(parentFolder.id, existing);
      assignedIds.add(course.id);
    }
  }

  // Map lessons/quizzes/tasklists to their parent course (item.courseName === course.title)
  const courseChildrenMap = new Map<string, LearnerAssignment[]>();
  for (const item of items) {
    if (item.type === 'folder' || item.type === 'course') continue;
    const parentCourse = courses.find((c) => c.title === item.courseName);
    if (parentCourse) {
      const existing = courseChildrenMap.get(parentCourse.id) || [];
      existing.push(item);
      courseChildrenMap.set(parentCourse.id, existing);
      assignedIds.add(item.id);
    }
  }

  const buildCourseNode = (course: LearnerAssignment): AssignmentNode => ({
    item: course,
    children: (courseChildrenMap.get(course.id) || []).map((child) => ({
      item: child,
      children: [],
    })),
  });

  const topLevel = [
    ...folders,
    ...items.filter((a) => !assignedIds.has(a.id) && a.type !== 'folder'),
  ];

  return topLevel.map((item) => {
    if (item.type === 'folder') {
      return {
        item,
        children: (folderChildrenMap.get(item.id) || []).map(buildCourseNode),
      };
    }
    if (item.type === 'course') {
      return buildCourseNode(item);
    }
    return { item, children: [] };
  });
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function DueBadge({ dueDate }: { dueDate: string | null }) {
  if (!dueDate) return <span className="text-xs text-gray-400">No due date</span>;
  const days = daysUntil(dueDate);
  if (days < 0) return <span className="text-xs font-medium text-red-600">Overdue</span>;
  if (days === 0) return <span className="text-xs font-medium text-red-600">Due today</span>;
  if (days === 1) return <span className="text-xs font-medium text-orange-600">Due tomorrow</span>;
  if (days <= 7) return <span className="text-xs font-medium text-orange-500">Due in {days} days</span>;
  return <span className="text-xs text-gray-500">Due {formatDate(dueDate)}</span>;
}

type RowRenderer = (item: LearnerAssignment, isNested: boolean, hasChildren: boolean) => React.ReactNode;

export default function LearnerDashboard() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const { inProgressTree, inProgressCount } = useMemo(() => {
    const items = learnerAssignments
      .filter((a) => a.status === 'in_progress')
      .sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    return { inProgressTree: buildTree(items), inProgressCount: items.length };
  }, []);

  const { notStartedTree, notStartedCount } = useMemo(() => {
    const items = learnerAssignments
      .filter((a) => a.status === 'not_started')
      .sort((a, b) => new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime());
    return { notStartedTree: buildTree(items), notStartedCount: items.length };
  }, []);

  const { upcomingTree, upcomingCount } = useMemo(() => {
    const items = learnerAssignments
      .filter((a) => a.status !== 'completed' && a.dueDate)
      .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
    return { upcomingTree: buildTree(items), upcomingCount: items.length };
  }, []);

  const completedCount = learnerAssignments.filter((a) => a.status === 'completed').length;
  const dueSoonCount = learnerAssignments.filter(
    (a) => a.status !== 'completed' && a.dueDate && daysUntil(a.dueDate) <= 7 && daysUntil(a.dueDate) >= 0,
  ).length;

  const renderTree = (tree: AssignmentNode[], renderRow: RowRenderer, borderColor: string) => {
    const renderNode = (node: AssignmentNode, depth: number): React.ReactNode => {
      const { item } = node;
      const hasChildren = node.children.length > 0;
      const isExpanded = expandedIds.has(item.id);
      const isNested = depth > 0;

      return (
        <div key={item.id}>
          <div
            className={`flex items-center gap-2.5 ${isNested ? 'py-1.5' : 'py-2'} hover:bg-white/60 transition-colors ${isNested ? 'pl-4 pr-1' : 'px-1'} ${hasChildren ? 'cursor-pointer select-none' : ''}`}
            onClick={hasChildren ? () => toggleExpand(item.id) : undefined}
          >
            {hasChildren ? (
              <span className="w-4 flex items-center justify-center flex-shrink-0 text-gray-400">
                {isExpanded ? (
                  <DownOutlined className="text-[10px]" />
                ) : (
                  <RightOutlined className="text-[10px]" />
                )}
              </span>
            ) : null}
            {renderRow(item, isNested, hasChildren)}
          </div>
          {hasChildren && isExpanded && (
            <div className={`border-l-2 ${depth === 0 ? borderColor : 'border-gray-100'} ml-3 mb-1`}>
              {node.children.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    };
    return tree.map((node) => renderNode(node, 0));
  };

  const inProgressRow: RowRenderer = (item, isNested, hasChildren) => (
    <>
      <div
        className={`${isNested ? 'w-6 h-6' : 'w-7 h-7'} rounded-md ${isNested ? 'bg-gray-50' : 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}
      >
        {typeIcons[item.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className={`${isNested ? 'text-[13px] text-gray-700' : 'text-sm text-gray-900'} font-medium truncate`}>
            {item.title}
          </p>
          {!hasChildren && !isNested && (
            <span className="text-[11px] text-gray-400 flex-shrink-0">{item.courseName}</span>
          )}
        </div>
      </div>
      <div className={`${isNested ? 'w-20' : 'w-24'} flex-shrink-0`}>
        <Progress percent={item.progress} size="small" strokeColor="#3b82f6" trailColor="#e5e7eb" showInfo={false} />
      </div>
      <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">{item.progress}%</span>
      <div className="flex-shrink-0">
        <DueBadge dueDate={item.dueDate} />
      </div>
    </>
  );

  const notStartedRow: RowRenderer = (item, isNested, hasChildren) => (
    <>
      <div
        className={`${isNested ? 'w-6 h-6' : 'w-7 h-7'} rounded-md ${isNested ? 'bg-gray-50' : 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}
      >
        {typeIcons[item.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className={`${isNested ? 'text-[13px] text-gray-700' : 'text-sm text-gray-900'} font-medium truncate`}>
            {item.title}
          </p>
          {!hasChildren && !isNested && (
            <span className="text-[11px] text-gray-400 flex-shrink-0">{item.courseName}</span>
          )}
        </div>
      </div>
      <span className="text-[11px] text-gray-400 flex-shrink-0">{formatDate(item.assignedDate)}</span>
      <div className="flex-shrink-0">
        <DueBadge dueDate={item.dueDate} />
      </div>
      {!hasChildren && (
        <button className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium rounded-md transition-colors flex-shrink-0">
          <PlayCircleOutlined className="text-[10px]" />
          Start
        </button>
      )}
    </>
  );

  const upcomingRow: RowRenderer = (item, isNested, hasChildren) => {
    const days = daysUntil(item.dueDate!);
    const isUrgent = days <= 3;
    const isSoon = days <= 7 && days > 3;
    return (
      <>
        {!isNested && (
          <div
            className={`w-9 h-9 rounded-md flex flex-col items-center justify-center flex-shrink-0 ${
              isUrgent ? 'bg-red-50' : isSoon ? 'bg-orange-50' : 'bg-gray-50'
            }`}
          >
            <span
              className={`text-sm font-bold leading-none ${
                isUrgent ? 'text-red-600' : isSoon ? 'text-orange-600' : 'text-gray-700'
              }`}
            >
              {days < 0 ? '!' : days}
            </span>
            <span
              className={`text-[9px] leading-tight ${
                isUrgent ? 'text-red-500' : isSoon ? 'text-orange-500' : 'text-gray-500'
              }`}
            >
              {days < 0 ? 'late' : days === 1 ? 'day' : 'days'}
            </span>
          </div>
        )}
        <div
          className={`${isNested ? 'w-6 h-6' : 'w-7 h-7'} rounded-md ${isNested ? 'bg-gray-50' : 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}
        >
          {typeIcons[item.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className={`${isNested ? 'text-[13px] text-gray-700' : 'text-sm text-gray-900'} font-medium truncate`}>
              {item.title}
            </p>
            {!hasChildren && !isNested && (
              <span className="text-[11px] text-gray-400 flex-shrink-0">{item.courseName}</span>
            )}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs font-medium text-gray-700">{formatDate(item.dueDate!)}</p>
          {item.status === 'in_progress' && (
            <p className="text-[11px] text-blue-600">{item.progress}%</p>
          )}
          {item.status === 'not_started' && (
            <p className="text-[11px] text-gray-400">Not started</p>
          )}
        </div>
      </>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-1">My Learning</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">Welcome back! Here's what you're working on.</p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <RocketOutlined className="text-blue-600 text-sm" />
            <span className="text-sm font-medium text-blue-700">{inProgressCount} in progress</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-full">
            <ClockCircleOutlined className="text-orange-600 text-sm" />
            <span className="text-sm font-medium text-orange-700">{dueSoonCount} due soon</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full">
            <CheckCircleOutlined className="text-green-600 text-sm" />
            <span className="text-sm font-medium text-green-700">{completedCount} completed</span>
          </div>
        </div>
      </div>

      {/* In Progress */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 p-3 sm:p-4 mb-4">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="bg-blue-100 p-1.5 rounded-md">
            <RocketOutlined className="text-blue-600 text-xs" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">In Progress</h3>
          <span className="text-xs text-gray-500">{inProgressCount} items</span>
        </div>
        <div className="space-y-0 divide-y divide-gray-100">
          {renderTree(inProgressTree, inProgressRow, 'border-blue-100')}
        </div>
      </div>

      {/* Recently Assigned */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 p-3 sm:p-4 mb-4">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="bg-purple-100 p-1.5 rounded-md">
            <CalendarOutlined className="text-purple-600 text-xs" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Recently Assigned</h3>
          <span className="text-xs text-gray-500">{notStartedCount} items</span>
        </div>
        <div className="space-y-0 divide-y divide-gray-100">
          {renderTree(notStartedTree, notStartedRow, 'border-purple-100')}
        </div>
      </div>

      {/* Upcoming Due */}
      <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100 p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="bg-orange-100 p-1.5 rounded-md">
            <ClockCircleOutlined className="text-orange-600 text-xs" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Upcoming Due Dates</h3>
          <span className="text-xs text-gray-500">{upcomingCount} items</span>
        </div>
        <div className="space-y-0 divide-y divide-gray-100">
          {renderTree(upcomingTree, upcomingRow, 'border-orange-100')}
        </div>
      </div>
    </div>
  );
}
