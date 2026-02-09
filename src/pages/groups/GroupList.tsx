import { useState } from 'react';
import { Button, Space, Popconfirm, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import GroupForm from './GroupForm';
import { mockGroups } from '../../data/groups';
import { mockUsers } from '../../data/users';
import type { Group } from '../../types';

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Group | undefined>();

  const handleSubmit = (values: Partial<Group>) => {
    if (editing) {
      setGroups((prev) => prev.map((g) => (g.id === editing.id ? { ...g, ...values } : g)));
      message.success('Group updated');
    } else {
      const newGroup: Group = {
        id: String(Date.now()),
        name: values.name || '',
        description: values.description || '',
        memberCount: 0,
        createdDate: new Date().toISOString().split('T')[0],
        members: [],
      };
      setGroups((prev) => [newGroup, ...prev]);
      message.success('Group created');
    }
    setEditing(undefined);
  };

  const handleDelete = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    message.success('Group deleted');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: Group, b: Group) => a.name.localeCompare(b.name) },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Members', dataIndex: 'memberCount', key: 'memberCount', sorter: (a: Group, b: Group) => a.memberCount - b.memberCount },
    { title: 'Created', dataIndex: 'createdDate', key: 'createdDate' },
    {
      title: 'Actions', key: 'actions',
      render: (_: unknown, record: Group) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setEditing(record); setModalOpen(true); }} />
          <Popconfirm title="Delete this group?" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Groups"
        subtitle={`${groups.length} groups`}
        actions={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(undefined); setModalOpen(true); }}>
            Create Group
          </Button>
        }
      />
      <DataTable<Group>
        data={groups}
        columns={columns}
        rowKey="id"
        searchFields={['name', 'description']}
        searchPlaceholder="Search groups..."
        expandable={{
          expandedRowRender: (record: Group) => {
            const members = mockUsers.filter((u) => record.members.includes(u.id));
            return members.length > 0
              ? members.map((m) => <Tag key={m.id}>{m.name}</Tag>)
              : <em>No members</em>;
          },
        }}
      />
      <GroupForm
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(undefined); }}
        onSubmit={handleSubmit}
        initialValues={editing}
      />
    </div>
  );
}
