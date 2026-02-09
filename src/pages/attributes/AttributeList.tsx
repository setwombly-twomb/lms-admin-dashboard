import { useState } from 'react';
import { Button, Tag, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import AttributeForm from './AttributeForm';
import { mockAttributes } from '../../data/attributes';
import type { Attribute } from '../../types';

const typeColors: Record<string, string> = { Text: 'blue', Number: 'purple', Date: 'cyan', Select: 'orange' };

export default function AttributeList() {
  const [attributes, setAttributes] = useState<Attribute[]>(mockAttributes);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Attribute | undefined>();

  const handleSubmit = (values: Partial<Attribute>) => {
    if (editing) {
      setAttributes((prev) => prev.map((a) => (a.id === editing.id ? { ...a, ...values } : a)));
      message.success('Attribute updated');
    } else {
      const newAttr: Attribute = {
        id: String(Date.now()),
        name: values.name || '',
        type: values.type || 'Text',
        appliedTo: values.appliedTo || 'User',
        required: values.required || false,
        options: values.options,
      };
      setAttributes((prev) => [newAttr, ...prev]);
      message.success('Attribute created');
    }
    setEditing(undefined);
  };

  const handleDelete = (id: string) => {
    setAttributes((prev) => prev.filter((a) => a.id !== id));
    message.success('Attribute deleted');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: Attribute, b: Attribute) => a.name.localeCompare(b.name) },
    {
      title: 'Type', dataIndex: 'type', key: 'type',
      render: (type: string) => <Tag color={typeColors[type]}>{type}</Tag>,
    },
    {
      title: 'Applied To', dataIndex: 'appliedTo', key: 'appliedTo',
      render: (v: string) => <Tag>{v}</Tag>,
    },
    {
      title: 'Required', dataIndex: 'required', key: 'required',
      render: (v: boolean) => v ? <Tag color="red">Yes</Tag> : <Tag>No</Tag>,
    },
    {
      title: 'Actions', key: 'actions',
      render: (_: unknown, record: Attribute) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setEditing(record); setModalOpen(true); }} />
          <Popconfirm title="Delete this attribute?" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Attributes"
        subtitle={`${attributes.length} custom attributes`}
        actions={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(undefined); setModalOpen(true); }}>
            Create Attribute
          </Button>
        }
      />
      <DataTable<Attribute>
        data={attributes}
        columns={columns}
        rowKey="id"
        searchFields={['name']}
        searchPlaceholder="Search attributes..."
      />
      <AttributeForm
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(undefined); }}
        onSubmit={handleSubmit}
        initialValues={editing}
      />
    </div>
  );
}
