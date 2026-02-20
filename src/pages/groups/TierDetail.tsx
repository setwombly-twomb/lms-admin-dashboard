import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Table, Progress, Tag, Tooltip } from 'antd';
import {
  TeamOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Column } from '@ant-design/charts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import StatCard from '../../components/common/StatCard';
import { mockGroups } from '../../data/groups';
import { mockCohortMembers } from '../../data/cohort';
import type { CohortMember } from '../../types';

dayjs.extend(relativeTime);

type Tier = 'behind' | 'atRisk' | 'onTrack';

function getTier(m: CohortMember): Tier {
  const daysSinceActive = dayjs().diff(dayjs(m.lastActiveDate), 'day');
  if (m.completionPct < 40 || m.quizAvgScore < 40 || daysSinceActive >= 5) return 'behind';
  if (m.completionPct < 70 || m.quizAvgScore < 70) return 'atRisk';
  return 'onTrack';
}

const tierMeta: Record<Tier, { label: string; color: string; bg: string; border: string; description: string; icon: React.ReactNode }> = {
  behind: {
    label: 'Behind',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
    description: 'Completion < 40%, quiz score < 40%, or inactive 5+ days',
    icon: <CloseCircleOutlined style={{ color: '#dc2626' }} />,
  },
  atRisk: {
    label: 'At Risk',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    description: 'Completion 40-69% or quiz score 40-69%',
    icon: <WarningOutlined style={{ color: '#d97706' }} />,
  },
  onTrack: {
    label: 'On Track',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    description: 'Completion >= 70% and quiz score >= 70%',
    icon: <CheckCircleOutlined style={{ color: '#16a34a' }} />,
  },
};

function quizPillColor(score: number): string {
  if (score >= 70) return 'green';
  if (score >= 40) return 'orange';
  return 'red';
}

export default function TierDetail() {
  const { groupId, tierKey } = useParams<{ groupId: string; tierKey: string }>();
  const group = mockGroups.find((g) => g.id === groupId);
  const groupName = group?.name ?? 'Cohort';
  const tier = (tierKey as Tier) || 'onTrack';
  const cfg = tierMeta[tier] ?? tierMeta.onTrack;

  const members = useMemo(
    () => mockCohortMembers.filter((m) => getTier(m) === tier),
    [tier],
  );

  const avgCompletion = members.length
    ? Math.round(members.reduce((s, m) => s + m.completionPct, 0) / members.length)
    : 0;
  const avgQuiz = members.length
    ? Math.round(members.reduce((s, m) => s + m.quizAvgScore, 0) / members.length)
    : 0;
  const avgLessons = members.length
    ? Math.round(members.reduce((s, m) => s + m.lessonsCompleted, 0) / members.length)
    : 0;
  const activeCount = members.filter(
    (m) => dayjs().diff(dayjs(m.lastActiveDate), 'day') <= 7,
  ).length;

  // Score distribution for chart
  const completionBuckets = useMemo(() => {
    const buckets = [
      { range: '0-19%', count: 0 },
      { range: '20-39%', count: 0 },
      { range: '40-59%', count: 0 },
      { range: '60-79%', count: 0 },
      { range: '80-100%', count: 0 },
    ];
    for (const m of members) {
      const idx = Math.min(Math.floor(m.completionPct / 20), 4);
      buckets[idx].count++;
    }
    return buckets;
  }, [members]);

  const quizBuckets = useMemo(() => {
    const buckets = [
      { range: '0-19%', count: 0 },
      { range: '20-39%', count: 0 },
      { range: '40-59%', count: 0 },
      { range: '60-79%', count: 0 },
      { range: '80-100%', count: 0 },
    ];
    for (const m of members) {
      const idx = Math.min(Math.floor(m.quizAvgScore / 20), 4);
      buckets[idx].count++;
    }
    return buckets;
  }, [members]);

  const columns = [
    {
      title: 'Learner',
      key: 'learner',
      sorter: (a: CohortMember, b: CohortMember) => a.name.localeCompare(b.name),
      render: (_: unknown, r: CohortMember) => (
        <div>
          <div className="font-medium text-gray-900">{r.name}</div>
          <div className="text-xs text-gray-500">{r.email}</div>
        </div>
      ),
    },
    {
      title: 'Completion',
      dataIndex: 'completionPct',
      key: 'completionPct',
      width: 200,
      sorter: (a: CohortMember, b: CohortMember) => a.completionPct - b.completionPct,
      render: (v: number) => (
        <Progress
          percent={v}
          size="small"
          strokeColor={v >= 70 ? '#16a34a' : v >= 40 ? '#d97706' : '#dc2626'}
          style={{ marginBottom: 0, width: 120 }}
          format={(p) => `${p}%`}
        />
      ),
    },
    {
      title: 'Quiz Avg',
      dataIndex: 'quizAvgScore',
      key: 'quizAvgScore',
      width: 100,
      sorter: (a: CohortMember, b: CohortMember) => a.quizAvgScore - b.quizAvgScore,
      render: (v: number) => <Tag color={quizPillColor(v)}>{v}%</Tag>,
    },
    {
      title: 'Lessons',
      key: 'lessons',
      width: 120,
      sorter: (a: CohortMember, b: CohortMember) => a.lessonsCompleted - b.lessonsCompleted,
      render: (_: unknown, r: CohortMember) => (
        <span className="text-sm text-gray-700">{r.lessonsCompleted} / {r.lessonsTotal}</span>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActiveDate',
      key: 'lastActiveDate',
      width: 140,
      sorter: (a: CohortMember, b: CohortMember) =>
        dayjs(a.lastActiveDate).unix() - dayjs(b.lastActiveDate).unix(),
      render: (v: string) => {
        const days = dayjs().diff(dayjs(v), 'day');
        return (
          <Tooltip title={dayjs(v).format('MMM D, YYYY')}>
            <span className={days >= 5 ? 'text-red-600 font-medium' : 'text-gray-600'}>
              {dayjs(v).fromNow()}
            </span>
          </Tooltip>
        );
      },
    },
  ];

  const expandedRowRender = (record: CohortMember) => (
    <div className="py-2 px-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Course Breakdown
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {record.courseBreakdown.map((c) => (
          <div key={c.courseName} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="text-sm font-medium text-gray-800 mb-1">{c.courseName}</div>
            <div className="flex items-center gap-3">
              <Progress
                percent={c.completion}
                size="small"
                strokeColor={c.completion >= 70 ? '#16a34a' : c.completion >= 40 ? '#d97706' : '#dc2626'}
                style={{ width: 80, marginBottom: 0 }}
                format={(p) => `${p}%`}
              />
              {c.quizScore !== null ? (
                <Tag color={quizPillColor(c.quizScore)} className="text-xs">Quiz: {c.quizScore}%</Tag>
              ) : (
                <span className="text-xs text-gray-400">No quiz</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-1">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Link to="/groups" className="text-blue-600 hover:text-blue-800 font-medium">Groups</Link>
          <span className="text-gray-300">/</span>
          <Link to={`/groups/${groupId}`} className="text-blue-600 hover:text-blue-800 font-medium">{groupName}</Link>
          <span className="text-gray-300">/</span>
          <span>{cfg.label}</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Link
          to={`/groups/${groupId}`}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ArrowLeftOutlined />
        </Link>
        <div
          style={{ width: 12, height: 12, borderRadius: '50%', background: cfg.color }}
        />
        <h1 className="text-2xl font-bold text-gray-900">{cfg.label}</h1>
        <Tag style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
          {members.length} learner{members.length !== 1 ? 's' : ''}
        </Tag>
      </div>
      <p className="text-sm text-gray-500 mb-6 ml-11">{cfg.description}</p>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <StatCard title="Learners" value={members.length} prefix={<TeamOutlined />} />
        <StatCard title="Avg Completion" value={avgCompletion} suffix="%" prefix={<CheckCircleOutlined />} />
        <StatCard title="Avg Quiz Score" value={avgQuiz} suffix="%" prefix={<TrophyOutlined />} />
        <StatCard title="Avg Lessons Done" value={avgLessons} prefix={cfg.icon} />
        <StatCard title="Active This Week" value={activeCount} prefix={<TeamOutlined />} />
      </div>

      {/* Distribution Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <Card title="Completion Distribution" size="small">
          <Column
            data={completionBuckets}
            xField="range"
            yField="count"
            height={200}
            color={cfg.color}
            label={{ text: (d: { count: number }) => d.count > 0 ? String(d.count) : '', position: 'inside' }}
          />
        </Card>
        <Card title="Quiz Score Distribution" size="small">
          <Column
            data={quizBuckets}
            xField="range"
            yField="count"
            height={200}
            color={cfg.color}
            label={{ text: (d: { count: number }) => d.count > 0 ? String(d.count) : '', position: 'inside' }}
          />
        </Card>
      </div>

      {/* Full Table */}
      <Card title={`All ${cfg.label} Learners`} size="small">
        <Table<CohortMember>
          dataSource={members}
          columns={columns}
          rowKey="id"
          size="middle"
          pagination={{ pageSize: 20, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'], showTotal: (t) => `${t} learners` }}
          scroll={{ x: true }}
          rowClassName={(_, index) => (index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50')}
          expandable={{ expandedRowRender }}
        />
      </Card>
    </div>
  );
}
