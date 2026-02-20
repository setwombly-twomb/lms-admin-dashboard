import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Table, Progress, Collapse, Input, Tag, Tooltip, Select, Button } from 'antd';
import {
  TeamOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  CaretRightOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  RightOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Radar } from '@ant-design/charts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import StatCard from '../../components/common/StatCard';
import { mockGroups } from '../../data/groups';
import { mockCohortMembers, cohortCategoryScores } from '../../data/cohort';
import type { CohortMember } from '../../types';

dayjs.extend(relativeTime);

type Tier = 'behind' | 'atRisk' | 'onTrack';
type DateRange = '7d' | '30d' | '90d' | 'all';

function getTier(m: CohortMember): Tier {
  const daysSinceActive = dayjs().diff(dayjs(m.lastActiveDate), 'day');
  if (m.completionPct < 40 || m.quizAvgScore < 40 || daysSinceActive >= 5) return 'behind';
  if (m.completionPct < 70 || m.quizAvgScore < 70) return 'atRisk';
  return 'onTrack';
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

const tierConfig: Record<Tier, {
  label: string; color: string; bg: string; border: string; description: string;
  icon: React.ReactNode;
}> = {
  behind: {
    label: 'Behind',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fca5a5',
    description: 'Completion < 40% or quiz < 40% or inactive 5+ days',
    icon: <ExclamationCircleOutlined style={{ color: '#dc2626', fontSize: 14 }} />,
  },
  atRisk: {
    label: 'At Risk',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fcd34d',
    description: 'Completion 40-69% or quiz score 40-69%',
    icon: <WarningOutlined style={{ color: '#d97706', fontSize: 14 }} />,
  },
  onTrack: {
    label: 'On Track',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#86efac',
    description: 'Completion >= 70% and quiz score >= 70%',
    icon: <CheckCircleOutlined style={{ color: '#16a34a', fontSize: 14 }} />,
  },
};

function quizPillColor(score: number): string {
  if (score >= 70) return 'green';
  if (score >= 40) return 'orange';
  return 'red';
}

const dateRangeOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'all', label: 'All time' },
];

function dateRangeDays(range: DateRange): number | null {
  if (range === '7d') return 7;
  if (range === '30d') return 30;
  if (range === '90d') return 90;
  return null;
}

const LIST_PAGE_SIZE = 8;

export default function CohortOverview() {
  const { groupId } = useParams<{ groupId: string }>();
  const group = mockGroups.find((g) => g.id === groupId);
  const groupName = group?.name ?? 'Cohort';

  const [tierSearch, setTierSearch] = useState<Record<Tier, string>>({
    behind: '', atRisk: '', onTrack: '',
  });
  const [analysisOpen, setAnalysisOpen] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [listPages, setListPages] = useState<Record<Tier, number>>({
    behind: 1, atRisk: 1, onTrack: 1,
  });

  const filteredByDate = useMemo(() => {
    const days = dateRangeDays(dateRange);
    if (!days) return mockCohortMembers;
    return mockCohortMembers.filter((m) => dayjs().diff(dayjs(m.lastActiveDate), 'day') <= days);
  }, [dateRange]);

  const tiers = useMemo(() => {
    const result: Record<Tier, CohortMember[]> = { behind: [], atRisk: [], onTrack: [] };
    for (const m of filteredByDate) result[getTier(m)].push(m);
    return result;
  }, [filteredByDate]);

  const totalLearners = filteredByDate.length;
  const avgCompletion = totalLearners
    ? Math.round(filteredByDate.reduce((s, m) => s + m.completionPct, 0) / totalLearners) : 0;
  const avgQuiz = totalLearners
    ? Math.round(filteredByDate.reduce((s, m) => s + m.quizAvgScore, 0) / totalLearners) : 0;
  const activeThisWeek = filteredByDate.filter(
    (m) => dayjs().diff(dayjs(m.lastActiveDate), 'day') <= 7,
  ).length;

  const onTrackPct = totalLearners ? Math.round((tiers.onTrack.length / totalLearners) * 100) : 0;
  const inactiveCount = filteredByDate.filter((m) => dayjs().diff(dayjs(m.lastActiveDate), 'day') >= 5).length;
  const topPerformer = [...filteredByDate].sort((a, b) => b.completionPct - a.completionPct)[0];
  const lowestCategory = [...cohortCategoryScores].sort((a, b) => a.score - b.score)[0];

  const radarData = cohortCategoryScores.map((c) => ({ category: c.category, score: c.score }));
  const sortedCategories = [...cohortCategoryScores].sort((a, b) => b.score - a.score);

  const radarAllData = [
    ...radarData.map((d) => ({ ...d, series: 'actual' })),
    ...[20, 40, 60, 80, 100].flatMap((score) =>
      radarData.map((d) => ({ category: d.category, score, series: `g${score}` })),
    ),
  ];

  function filteredMembers(tier: Tier): CohortMember[] {
    const q = tierSearch[tier].toLowerCase();
    if (!q) return tiers[tier];
    return tiers[tier].filter(
      (m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q),
    );
  }

  function tierAvg(tier: Tier, field: 'completionPct' | 'quizAvgScore') {
    const members = tiers[tier];
    if (!members.length) return 0;
    return Math.round(members.reduce((s, m) => s + m[field], 0) / members.length);
  }

  // ── Learner list row for Behind / At Risk ──
  function LearnerRow({ member, tier }: { member: CohortMember; tier: 'behind' | 'atRisk' }) {
    const cfg = tierConfig[tier];
    const daysSince = dayjs().diff(dayjs(member.lastActiveDate), 'day');
    const isExpanded = expandedCards[member.id] ?? false;

    return (
      <div
        className="border-b last:border-b-0 transition-colors"
        style={{ borderColor: '#f0f0f0' }}
      >
        {/* Main row */}
        <div
          className="group flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50/80 transition-colors"
          onClick={() => setExpandedCards((p) => ({ ...p, [member.id]: !p[member.id] }))}
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {initials(member.name)}
          </div>

          {/* Name + email */}
          <div className="w-44 flex-shrink-0 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{member.name}</div>
            <div className="text-xs text-gray-400 truncate">{member.email}</div>
          </div>

          {/* Completion */}
          <div className="w-32 flex-shrink-0">
            <Progress
              percent={member.completionPct}
              size="small"
              strokeColor={member.completionPct >= 70 ? '#16a34a' : member.completionPct >= 40 ? '#d97706' : '#dc2626'}
              style={{ marginBottom: 0 }}
              format={(p) => `${p}%`}
            />
          </div>

          {/* Quiz */}
          <div className="w-16 flex-shrink-0">
            <Tag color={quizPillColor(member.quizAvgScore)} style={{ margin: 0 }}>
              {member.quizAvgScore}%
            </Tag>
          </div>

          {/* Last active */}
          <div className="w-24 flex-shrink-0">
            <Tooltip title={dayjs(member.lastActiveDate).format('MMM D, YYYY')}>
              <span className={`text-xs ${daysSince >= 5 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                {dayjs(member.lastActiveDate).fromNow()}
              </span>
            </Tooltip>
          </div>

          {/* Expand chevron */}
          <div className={`ml-auto flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-gray-200' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
            <CaretRightOutlined
              className="transition-transform"
              style={{ color: '#6b7280', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', fontSize: 9 }}
            />
          </div>
        </div>

        {/* Expanded detail */}
        {isExpanded && (
          <div className="px-4 pb-4 pt-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {member.courseBreakdown.map((c) => (
                  <div key={c.courseName} className="flex items-center gap-2 bg-white rounded px-3 py-2">
                    <span className="text-xs text-gray-600 w-32 truncate flex-shrink-0">{c.courseName}</span>
                    <Progress
                      percent={c.completion}
                      size="small"
                      strokeColor={c.completion >= 70 ? '#16a34a' : c.completion >= 40 ? '#d97706' : '#dc2626'}
                      style={{ flex: 1, marginBottom: 0 }}
                      format={(p) => `${p}%`}
                    />
                    {c.quizScore !== null ? (
                      <span className="text-[10px] text-gray-500 w-8 text-right">{c.quizScore}%</span>
                    ) : (
                      <span className="text-[10px] text-gray-300 w-8 text-right">—</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="small" icon={<MailOutlined />} style={{ fontSize: 12 }}>
                  Send Reminder
                </Button>
                <Button size="small" type="link" style={{ fontSize: 12, color: cfg.color }}>
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── List renderer for Behind / At Risk ──
  function renderLearnerList(tier: 'behind' | 'atRisk') {
    const cfg = tierConfig[tier];
    const members = filteredMembers(tier);
    const page = listPages[tier];
    const visible = members.slice(0, page * LIST_PAGE_SIZE);
    const hasMore = visible.length < members.length;

    return (
      <div>
        <div className="px-4 pt-3 pb-2">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search by name or email..."
            value={tierSearch[tier]}
            onChange={(e) => {
              setTierSearch((prev) => ({ ...prev, [tier]: e.target.value }));
              setListPages((prev) => ({ ...prev, [tier]: 1 }));
            }}
            allowClear
            style={{ width: 260 }}
            size="small"
          />
        </div>

        {/* Column labels */}
        <div className="flex items-center gap-4 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 border-b border-gray-100">
          <div className="w-8 flex-shrink-0" />
          <div className="w-44 flex-shrink-0">Learner</div>
          <div className="w-32 flex-shrink-0">Completion</div>
          <div className="w-16 flex-shrink-0">Quiz</div>
          <div className="w-24 flex-shrink-0">Last Active</div>
          <div className="ml-auto" />
        </div>

        {members.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">No learners match your search</div>
        ) : (
          <>
            {visible.map((m) => (
              <LearnerRow key={m.id} member={m} tier={tier} />
            ))}
            {hasMore && (
              <div className="text-center py-3 border-t border-gray-100">
                <Button
                  type="text"
                  size="small"
                  icon={<DownOutlined />}
                  onClick={() => setListPages((prev) => ({ ...prev, [tier]: prev[tier] + 1 }))}
                  style={{ color: cfg.color, fontSize: 12 }}
                >
                  Show more ({members.length - visible.length} remaining)
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // ── On Track table columns ──
  const onTrackColumns = [
    {
      title: 'Learner',
      key: 'learner',
      sorter: (a: CohortMember, b: CohortMember) => a.name.localeCompare(b.name),
      render: (_: unknown, r: CohortMember) => (
        <div className="py-0.5">
          <div className="font-medium text-gray-900 text-sm">{r.name}</div>
          <div className="text-xs text-gray-400">{r.email}</div>
        </div>
      ),
    },
    {
      title: 'Completion',
      dataIndex: 'completionPct',
      key: 'completionPct',
      width: 180,
      sorter: (a: CohortMember, b: CohortMember) => a.completionPct - b.completionPct,
      render: (v: number) => (
        <Progress percent={v} size="small" strokeColor="#16a34a" style={{ marginBottom: 0, width: 110 }} format={(p) => `${p}%`} />
      ),
    },
    {
      title: 'Quiz Avg',
      dataIndex: 'quizAvgScore',
      key: 'quizAvgScore',
      width: 90,
      sorter: (a: CohortMember, b: CohortMember) => a.quizAvgScore - b.quizAvgScore,
      render: (v: number) => <Tag color="green">{v}%</Tag>,
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActiveDate',
      key: 'lastActiveDate',
      width: 130,
      sorter: (a: CohortMember, b: CohortMember) =>
        dayjs(a.lastActiveDate).unix() - dayjs(b.lastActiveDate).unix(),
      render: (v: string) => (
        <Tooltip title={dayjs(v).format('MMM D, YYYY')}>
          <span className="text-gray-500">{dayjs(v).fromNow()}</span>
        </Tooltip>
      ),
    },
  ];

  const expandedRowRender = (record: CohortMember) => (
    <div className="py-2 px-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Course Breakdown</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {record.courseBreakdown.map((c) => (
          <div key={c.courseName} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="text-sm font-medium text-gray-800 mb-1">{c.courseName}</div>
            <div className="flex items-center gap-3">
              <Progress
                percent={c.completion} size="small"
                strokeColor={c.completion >= 70 ? '#16a34a' : c.completion >= 40 ? '#d97706' : '#dc2626'}
                style={{ width: 80, marginBottom: 0 }} format={(p) => `${p}%`}
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

  const tierOrder: Tier[] = ['behind', 'atRisk', 'onTrack'];

  return (
    <div>
      {/* Header */}
      <div className="mb-1">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Link to="/groups" className="text-blue-600 hover:text-blue-800 font-medium">Groups</Link>
          <span className="text-gray-300">/</span>
          <span>{groupName}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{groupName}</h1>
          <Tag color="blue">{totalLearners} learners</Tag>
        </div>
        <Select
          value={dateRange}
          onChange={(v) => setDateRange(v as DateRange)}
          options={dateRangeOptions}
          style={{ width: 160 }}
        />
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard title="Total Learners" value={totalLearners} prefix={<TeamOutlined />} trend={{ value: 4, label: 'vs last month' }} />
        <StatCard title="Avg Completion" value={avgCompletion} suffix="%" prefix={<CheckCircleOutlined />} trend={{ value: 3, label: 'vs last month' }} />
        <StatCard title="Avg Quiz Score" value={avgQuiz} suffix="%" prefix={<TrophyOutlined />} trend={{ value: -2, label: 'vs last month' }} />
        <StatCard title="Active This Week" value={activeThisWeek} prefix={<ThunderboltOutlined />} trend={{ value: activeThisWeek >= totalLearners * 0.8 ? 5 : -8, label: 'vs last week' }} />
      </div>

      {/* Cohort Analysis Panel */}
      <Card style={{ marginBottom: 24 }} styles={{ body: { padding: analysisOpen ? undefined : 0 } }}>
        <div
          className="flex items-center justify-between cursor-pointer select-none -mx-6 px-6 py-2 -my-2 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
          onClick={() => setAnalysisOpen(!analysisOpen)}
        >
          <div className="flex items-center gap-2">
            <InfoCircleOutlined className="text-blue-500" />
            <span className="font-semibold text-gray-900">Cohort Analysis</span>
          </div>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${analysisOpen ? 'bg-blue-50' : 'bg-gray-100'}`}>
            <CaretRightOutlined
              className="transition-transform"
              style={{ color: analysisOpen ? '#1677ff' : '#9ca3af', transform: analysisOpen ? 'rotate(90deg)' : 'rotate(0deg)', fontSize: 11 }}
            />
          </div>
        </div>
        {analysisOpen && (
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Insights</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0"><CheckCircleOutlined className="text-green-600" /></div>
                  <div><div className="text-lg font-bold text-green-700">{onTrackPct}%</div><div className="text-xs text-green-600">Learners on track</div></div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0"><WarningOutlined className="text-amber-600" /></div>
                  <div><div className="text-lg font-bold text-amber-700">{inactiveCount}</div><div className="text-xs text-amber-600">Inactive 5+ days</div></div>
                </div>
                {topPerformer && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"><TrophyOutlined className="text-blue-600" /></div>
                    <div><div className="text-sm font-bold text-blue-700 truncate">{topPerformer.name}</div><div className="text-xs text-blue-600">Top performer ({topPerformer.completionPct}%)</div></div>
                  </div>
                )}
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0"><CloseCircleOutlined className="text-red-500" /></div>
                  <div><div className="text-sm font-bold text-red-700 truncate">{lowestCategory.category}</div><div className="text-xs text-red-500">Weakest area ({lowestCategory.score}%)</div></div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category Performance</p>
                <div className="space-y-2">
                  {sortedCategories.map((c) => (
                    <div key={c.category} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-40 truncate flex-shrink-0">{c.category}</span>
                      <Progress percent={c.score} size="small" strokeColor={c.score >= 85 ? '#16a34a' : c.score >= 70 ? '#1677ff' : '#d97706'} style={{ flex: 1, marginBottom: 0 }} format={(p) => `${p}%`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Category Strengths</p>
              <div className="flex items-center justify-center">
                <Radar
                  data={radarAllData}
                  xField="category"
                  yField="score"
                  seriesField="series"
                  height={280}
                  meta={{ score: { min: 0, max: 100 } }}
                  color={(s: string) => s === 'actual' ? '#1677ff' : 'transparent'}
                  point={{
                    size: 3,
                    style: ((datum: any) => ({
                      fill: datum.series === 'actual' ? '#1677ff' : '#94a3b8',
                      stroke: datum.series === 'actual' ? '#ffffff' : '#cbd5e1',
                      lineWidth: 1,
                    })) as any,
                  }}
                  area={{ style: { fillOpacity: 0.15 } }}
                  xAxis={{ line: null, tickLine: null }}
                  yAxis={{ grid: { line: { style: { stroke: '#e5e7eb', lineWidth: 1 } } } }}
                  legend={false}
                />
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Performance Tiers */}
      <Collapse
        defaultActiveKey={['behind', 'atRisk']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined className="text-gray-400" style={{ transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        )}
        style={{ background: 'transparent', border: 'none' }}
        items={tierOrder.map((tier) => {
          const cfg = tierConfig[tier];
          const total = tiers[tier].length;
          const avgComp = tierAvg(tier, 'completionPct');
          const avgQz = tierAvg(tier, 'quizAvgScore');

          return {
            key: tier,
            style: {
              marginBottom: 16,
              background: '#fff',
              borderRadius: 12,
              border: `1px solid ${cfg.border}`,
              overflow: 'hidden',
            },
            label: (
              <div className="flex items-center justify-between w-full pr-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center rounded-full" style={{ width: 26, height: 26, background: cfg.bg }}>
                    {cfg.icon}
                  </div>
                  <span className="font-semibold text-gray-900">{cfg.label}</span>
                  <Tag style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, fontWeight: 600 }}>{total}</Tag>
                  <span className="text-xs text-gray-400 hidden lg:inline">
                    {avgComp}% completion · {avgQz}% quiz avg
                  </span>
                </div>
                <Link
                  to={`/groups/${groupId}/tier/${tier}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:shadow-sm active:scale-95"
                  style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  Details <RightOutlined style={{ fontSize: 9 }} />
                </Link>
              </div>
            ),
            children:
              tier === 'onTrack' ? (
                <div>
                  <div style={{ padding: '12px 16px 0' }}>
                    <Input
                      prefix={<SearchOutlined className="text-gray-400" />}
                      placeholder="Search by name or email..."
                      value={tierSearch.onTrack}
                      onChange={(e) => setTierSearch((prev) => ({ ...prev, onTrack: e.target.value }))}
                      allowClear style={{ width: 260, marginBottom: 12 }} size="small"
                    />
                  </div>
                  <Table<CohortMember>
                    dataSource={filteredMembers('onTrack')}
                    columns={onTrackColumns}
                    rowKey="id" size="middle"
                    pagination={{ pageSize: 10, showSizeChanger: false, showTotal: (t) => `${t} learners` }}
                    scroll={{ x: true }}
                    rowClassName={(_, index) => (index % 2 === 0 ? '' : 'bg-gray-50/60')}
                    expandable={{
                      expandedRowKeys: Object.keys(expandedRows).filter((k) => expandedRows[k]),
                      onExpand: (expanded, record) => setExpandedRows((prev) => ({ ...prev, [record.id]: expanded })),
                      expandedRowRender,
                    }}
                  />
                </div>
              ) : (
                renderLearnerList(tier as 'behind' | 'atRisk')
              ),
          };
        })}
      />
    </div>
  );
}
