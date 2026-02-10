import { useState, useMemo } from 'react';
import { Row, Col, Card, Table, Select, Space } from 'antd';
import {
  FileTextOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Column, Line, Pie } from '@ant-design/charts';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import { mockQuizMetrics, scoreDistribution, passRateTrend } from '../../data/quizMetrics';
import { mockUsers } from '../../data/users';
import { mockGroups } from '../../data/groups';
import { mockAttributes } from '../../data/attributes';
import type { QuizMetric } from '../../types';

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
  { title: 'Quiz', dataIndex: 'quizName', key: 'quizName' },
  { title: 'Course', dataIndex: 'courseName', key: 'courseName' },
  { title: 'Attempts', dataIndex: 'attempts', key: 'attempts', sorter: (a: QuizMetric, b: QuizMetric) => a.attempts - b.attempts },
  { title: 'Avg Score', dataIndex: 'avgScore', key: 'avgScore', sorter: (a: QuizMetric, b: QuizMetric) => a.avgScore - b.avgScore, render: (v: number) => `${v}%` },
  { title: 'Pass Rate', dataIndex: 'passRate', key: 'passRate', sorter: (a: QuizMetric, b: QuizMetric) => a.passRate - b.passRate, render: (v: number) => `${v}%` },
];

export default function QuizAnalytics() {
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
    if (!filteredUserIds) return mockQuizMetrics;
    return mockQuizMetrics.filter((m) => m.userIds.some((id) => filteredUserIds.has(id)));
  }, [filteredUserIds]);

  const totalAttempts = useMemo(() => filteredMetrics.reduce((sum, q) => sum + q.attempts, 0), [filteredMetrics]);
  const avgScore = useMemo(() => filteredMetrics.length ? Math.round(filteredMetrics.reduce((sum, q) => sum + q.avgScore, 0) / filteredMetrics.length) : 0, [filteredMetrics]);
  const avgPassRate = useMemo(() => filteredMetrics.length ? Math.round(filteredMetrics.reduce((sum, q) => sum + q.passRate, 0) / filteredMetrics.length) : 0, [filteredMetrics]);

  const passFailData = useMemo(() => [
    { type: 'Pass', value: avgPassRate },
    { type: 'Fail', value: 100 - avgPassRate },
  ], [avgPassRate]);

  return (
    <div>
      <PageHeader title="Quiz Analytics" subtitle="Performance metrics for quizzes" />

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
        <StatCard title="Total Quizzes" value={filteredMetrics.length} prefix={<FileTextOutlined />} />
        <StatCard title="Avg Score" value={avgScore} suffix="%" prefix={<TrophyOutlined />} />
        <StatCard title="Pass Rate" value={avgPassRate} suffix="%" prefix={<CheckCircleOutlined />} />
        <StatCard title="Total Attempts" value={totalAttempts} prefix={<ThunderboltOutlined />} />
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Score Distribution">
            <Column data={scoreDistribution} xField="range" yField="count" color="#1677ff" height={250} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Pass Rate Over Time">
            <Line data={passRateTrend} xField="month" yField="rate" color="#52c41a" height={250} point={{ size: 4 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="Per-Quiz Breakdown">
            <Table dataSource={filteredMetrics} columns={columns} rowKey="id" scroll={{ x: true }} pagination={false} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Pass / Fail Ratio">
            <Pie
              data={passFailData}
              angleField="value"
              colorField="type"
              innerRadius={0.6}
              height={280}
              color={['#52c41a', '#ff4d4f']}
              label={{ text: 'type', position: 'outside' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
