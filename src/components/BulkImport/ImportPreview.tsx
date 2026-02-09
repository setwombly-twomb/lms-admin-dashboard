import { Table, Tag, Button, Space, Alert } from 'antd';
import type { CsvRow, ValidationError } from '../../types';

interface ImportPreviewProps {
  data: CsvRow[];
  headers: string[];
  errors: ValidationError[];
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ImportPreview({ data, headers, errors, onConfirm, onCancel }: ImportPreviewProps) {
  const errorRowSet = new Set(errors.map((e) => e.row));

  const columns = headers.map((h) => ({
    title: h,
    dataIndex: h,
    key: h,
  }));

  columns.push({
    title: 'Status',
    dataIndex: '_status',
    key: '_status',
  });

  const dataSource = data.map((row, i) => ({
    ...row,
    key: i,
    _status: errorRowSet.has(i) ? (
      <Tag color="red">Invalid</Tag>
    ) : (
      <Tag color="green">Valid</Tag>
    ),
  }));

  return (
    <div>
      {errors.length > 0 && (
        <Alert
          type="warning"
          showIcon
          message={`${errors.length} validation error(s) found`}
          description={
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {errors.slice(0, 5).map((e, i) => (
                <li key={i}>
                  Row {e.row + 1}: {e.field} — {e.message}
                </li>
              ))}
              {errors.length > 5 && <li>...and {errors.length - 5} more</li>}
            </ul>
          }
          style={{ marginBottom: 16 }}
        />
      )}
      <Table
        dataSource={dataSource}
        columns={columns}
        size="small"
        scroll={{ x: true }}
        pagination={{ pageSize: 10 }}
      />
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" onClick={onConfirm}>
          Confirm Import ({data.length - errorRowSet.size} valid rows)
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Space>
    </div>
  );
}
