import { Row, Col, Card, Table } from 'antd';
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
import type { QuizMetric } from '../../types';

const totalAttempts = mockQuizMetrics.reduce((sum, q) => sum + q.attempts, 0);
const avgScore = Math.round(mockQuizMetrics.reduce((sum, q) => sum + q.avgScore, 0) / mockQuizMetrics.length);
const avgPassRate = Math.round(mockQuizMetrics.reduce((sum, q) => sum + q.passRate, 0) / mockQuizMetrics.length);

const passFailData = [
  { type: 'Pass', value: avgPassRate },
  { type: 'Fail', value: 100 - avgPassRate },
];

const columns = [
  { title: 'Quiz', dataIndex: 'quizName', key: 'quizName' },
  { title: 'Course', dataIndex: 'courseName', key: 'courseName' },
  { title: 'Attempts', dataIndex: 'attempts', key: 'attempts', sorter: (a: QuizMetric, b: QuizMetric) => a.attempts - b.attempts },
  { title: 'Avg Score', dataIndex: 'avgScore', key: 'avgScore', sorter: (a: QuizMetric, b: QuizMetric) => a.avgScore - b.avgScore, render: (v: number) => `${v}%` },
  { title: 'Pass Rate', dataIndex: 'passRate', key: 'passRate', sorter: (a: QuizMetric, b: QuizMetric) => a.passRate - b.passRate, render: (v: number) => `${v}%` },
];

export default function QuizAnalytics() {
  return (
    <div>
      <PageHeader title="Quiz Analytics" subtitle="Performance metrics for quizzes" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard title="Total Quizzes" value={mockQuizMetrics.length} prefix={<FileTextOutlined />} />
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
            <Table dataSource={mockQuizMetrics} columns={columns} rowKey="id" scroll={{ x: true }} pagination={false} />
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
