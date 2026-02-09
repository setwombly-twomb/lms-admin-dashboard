import { Row, Col, Card, Table, Progress } from 'antd';
import {
  ReadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Line, Column } from '@ant-design/charts';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import { mockLessonMetrics, completionTrend, timePerLesson } from '../../data/lessonMetrics';
import type { LessonMetric } from '../../types';

const avgCompletion = Math.round(mockLessonMetrics.reduce((s, l) => s + l.completionRate, 0) / mockLessonMetrics.length);
const avgTime = Math.round(mockLessonMetrics.reduce((s, l) => s + l.avgTimeMinutes, 0) / mockLessonMetrics.length);
const totalViews = mockLessonMetrics.reduce((s, l) => s + l.views, 0);

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
  return (
    <div>
      <PageHeader title="Lesson Analytics" subtitle="Performance metrics for lessons" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard title="Total Lessons" value={mockLessonMetrics.length} prefix={<ReadOutlined />} />
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
            <Column data={timePerLesson} xField="lesson" yField="minutes" color="#722ed1" height={250} />
          </Card>
        </Col>
      </Row>

      <Card title="Per-Lesson Breakdown" style={{ marginTop: 16 }}>
        <Table dataSource={mockLessonMetrics} columns={columns} rowKey="id" scroll={{ x: true }} pagination={false} />
      </Card>
    </div>
  );
}
