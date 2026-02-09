import { Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useState, type ReactNode } from 'react';

interface DataTableProps<T> extends Omit<TableProps<T>, 'dataSource'> {
  data: T[];
  searchFields?: (keyof T)[];
  searchPlaceholder?: string;
  filters?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable<T extends Record<string, any>>({
  data,
  searchFields,
  searchPlaceholder = 'Search...',
  filters,
  ...tableProps
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');

  const filtered = search && searchFields
    ? data.filter((item) =>
        searchFields.some((field) => {
          const val = item[field];
          return val != null && String(val).toLowerCase().includes(search.toLowerCase());
        })
      )
    : data;

  return (
    <div>
      <Space style={{ marginBottom: 16, flexWrap: 'wrap' }} size="middle">
        {searchFields && (
          <Input
            prefix={<SearchOutlined />}
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            style={{ width: 260 }}
          />
        )}
        {filters}
      </Space>
      <Table<T> dataSource={filtered} scroll={{ x: true }} {...tableProps} />
    </div>
  );
}
