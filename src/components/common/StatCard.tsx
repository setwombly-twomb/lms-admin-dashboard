import { Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: string;
  trend?: { value: number; label?: string };
}

export default function StatCard({ title, value, prefix, suffix, trend }: StatCardProps) {
  const isPositive = trend && trend.value > 0;
  const isNegative = trend && trend.value < 0;

  return (
    <Card>
      <Statistic title={title} value={value} prefix={prefix} suffix={suffix} />
      {trend && (
        <div className="mt-1 flex items-center gap-1">
          {isPositive && <ArrowUpOutlined style={{ color: '#16a34a', fontSize: 11 }} />}
          {isNegative && <ArrowDownOutlined style={{ color: '#dc2626', fontSize: 11 }} />}
          <span
            className="text-xs font-medium"
            style={{ color: isPositive ? '#16a34a' : isNegative ? '#dc2626' : '#6b7280' }}
          >
            {isPositive ? '+' : ''}{trend.value}%
          </span>
          {trend.label && (
            <span className="text-xs text-gray-400">{trend.label}</span>
          )}
        </div>
      )}
    </Card>
  );
}
