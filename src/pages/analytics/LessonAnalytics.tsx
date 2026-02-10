import { useState, useMemo } from 'react';
import { Row, Col, Card, Table, Progress, Select, Space } from 'antd';
import {
  ReadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Line, Column } from '@ant-design/charts';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import { mockLessonMetrics, completionTrend } from '../../data/lessonMetrics';
import { mockUsers } from '../../data/users';
import { mockGroups } from '../../data/groups';
import { mockAttributes } from '../../data/attributes';
import type { LessonMetric } from '../../types';

const selectAttributes = mockAttributes.filter((a) => a.type === 'Select' && a.appliedTo === 'User');

const attributeUserMap: Record<string, Record<string, string[]>> = {
  Department: {
    Engineering: ['1', '2', '5', '8', '12'],
    Marketing: ['3', '6', '11'],
    Sales: ['4', '6', '10'],
    Design: ['5', '7'],
    HR: ['9'],
  },
  'Skill Level': {
    Beginner: ['4', '8', '10'],
    Intermediate: ['3', '6', '7', '11'],
    Advanced: ['1', '2', '5', '12'],
    Expert: ['9'],
  },
};

const columns = [
  { title: 'Lesson', dataIndex: 'lessonName', key: 'lessonName' },
  { title: 'Course', dataIndex: 'courseName', key: 'courseName' },
  { title: 'Views', dataIndex: 'views', key: 'views', sorter: (a: LessonMetric, b: LessonMetric) => a.views - b.views },
  {
    title: 'Completion',
    dataIndex: 'completionRate',
    key: 'completionRate',
    sorter: (a: LessonMetric, b: LessonMetric) => a.completionRate - b.completionRate,
    render: (v: number) => <Progress percent={v} size="small" style={{ minWidth: 120 }} />,
  },
  {
    title: 'Avg Time',
    dataIndex: 'avgTimeMinutes',
    key: 'avgTimeMinutes',
    sorter: (a: LessonMetric, b: LessonMetric) => a.avgTimeMinutes - b.avgTimeMinutes,
    render: (v: number) => `${v} min`,
  },
];

export default function LessonAnalytics() {
  const [groupFilter, setGroupFilter] = useState<string | undefined>();
  const [userFilter, setUserFilter] = useState<string[]>([]);
  const [attrName, setAttrName] = useState<string | undefined>();
  const [attrValue, setAttrValue] = useState<string | undefined>();

  const selectedAttr = selectAttributes.find((a) => a.name === attrName);

  const filteredUserIds = useMemo(() => {
    let ids: Set<string> | null = null;

    if (groupFilter) {
      const group = mockGroups.find((g) => g.name === groupFilter);
      if (group) ids = new Set(group.members);
    }

    if (attrName && attrValue) {
      const attrIds = new Set(attributeUserMap[attrName]?.[attrValue] ?? []);
      ids = ids ? new Set([...ids].filter((id) => attrIds.has(id))) : attrIds;
    }

    if (userFilter.length > 0) {
      const userSet = new Set(userFilter);
      ids = ids ? new Set([...ids].filter((id) => userSet.has(id))) : userSet;
    }

    return ids;
  }, [groupFilter, attrName, attrValue, userFilter]);

  const filteredMetrics = useMemo(() => {
    if (!filteredUserIds) return mockLessonMetrics;
    return mockLessonMetrics.filter((m) => m.userIds.some((id) => filteredUserIds.has(id)));
  }, [filteredUserIds]);

  const avgCompletion = useMemo(() => filteredMetrics.length ? Math.round(filteredMetrics.reduce((s, l) => s + l.completionRate, 0) / filteredMetrics.length) : 0, [filteredMetrics]);
  const avgTime = useMemo(() => filteredMetrics.length ? Math.round(filteredMetrics.reduce((s, l) => s + l.avgTimeMinutes, 0) / filteredMetrics.length) : 0, [filteredMetrics]);
  const totalViews = useMemo(() => filteredMetrics.reduce((s, l) => s + l.views, 0), [filteredMetrics]);

  const filteredTimePerLesson = useMemo(() =>
    filteredMetrics.map((m) => ({ lesson: m.lessonName, minutes: m.avgTimeMinutes })),
  [filteredMetrics]);

  return (
    <div>
      <PageHeader title="Lesson Analytics" subtitle="Performance metrics for lessons" />

      <Space wrap style={{ marginBottom: 16 }}>
        <Select
          placeholder="Attribute"
          allowClear
          style={{ width: 160 }}
          value={attrName}
          onChange={(v) => { setAttrName(v); setAttrValue(undefined); }}
          options={selectAttributes.map((a) => ({ value: a.name, label: a.name }))}
        />
        <Select
          placeholder="Value"
          allowClear
          style={{ width: 160 }}
          value={attrValue}
          disabled={!attrName}
          onChange={setAttrValue}
          options={(selectedAttr?.options ?? []).map((o) => ({ value: o, label: o }))}
        />
        <Select
          placeholder="Group"
          allowClear
          style={{ width: 160 }}
          value={groupFilter}
          onChange={setGroupFilter}
          options={mockGroups.map((g) => ({ value: g.name, label: g.name }))}
        />
        <Select
          mode="multiple"
          placeholder="User(s)"
          allowClear
          style={{ minWidth: 200 }}
          value={userFilter}
          onChange={setUserFilter}
          options={mockUsers.map((u) => ({ value: u.id, label: u.name }))}
        />
      </Space>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard title="Total Lessons" value={filteredMetrics.length} prefix={<ReadOutlined />} />
        <StatCard title="Avg Completion Rate" value={avgCompletion} suffix="%" prefix={<CheckCircleOutlined />} />
        <StatCard title="Avg Time Spent" value={avgTime} suffix=" min" prefix={<ClockCircleOutlined />} />
        <StatCard title="Total Views" value={totalViews} prefix={<UserOutlined />} />
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Completion Rate Trend">
            <Line data={completionTrend} xField="month" yField="rate" color="#1677ff" height={250} point={{ size: 4 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Time Spent per Lesson">
            <Column data={filteredTimePerLesson} xField="lesson" yField="minutes" color="#722ed1" height={250} />
          </Card>
        </Col>
      </Row>

      <Card title="Per-Lesson Breakdown" style={{ marginTop: 16 }}>
        <Table dataSource={filteredMetrics} columns={columns} rowKey="id" scroll={{ x: true }} pagination={false} />
      </Card>
    </div>
  );
}
