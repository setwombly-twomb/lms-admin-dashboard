import { useState } from 'react';
import { Button, Tag, Select, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import UserForm from './UserForm';
import { mockUsers } from '../../data/users';
import type { User } from '../../types';

const roleColors: Record<string, string> = { Admin: 'red', Instructor: 'blue', Learner: 'green' };
const statusColors: Record<string, string> = { Active: 'green', Inactive: 'default' };

export default function UserList() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | undefined>();
  const [roleFilter, setRoleFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const navigate = useNavigate();

  const filtered = users.filter((u) => {
    if (roleFilter && u.role !== roleFilter) return false;
    if (statusFilter && u.status !== statusFilter) return false;
    return true;
  });

  const handleSubmit = (values: Partial<User>) => {
    if (editing) {
      setUsers((prev) => prev.map((u) => (u.id === editing.id ? { ...u, ...values } : u)));
      message.success('User updated');
    } else {
      const newUser: User = {
        id: String(Date.now()),
        name: values.name || '',
        email: values.email || '',
        role: values.role || 'Learner',
        status: values.status || 'Active',
        groups: values.groups || [],
        lastActive: new Date().toISOString().split('T')[0],
      };
      setUsers((prev) => [newUser, ...prev]);
      message.success('User created');
    }
    setEditing(undefined);
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    message.success('User deleted');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: User, b: User) => a.name.localeCompare(b.name) },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Role', dataIndex: 'role', key: 'role',
      render: (role: string) => <Tag color={roleColors[role]}>{role}</Tag>,
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (status: string) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: 'Groups', dataIndex: 'groups', key: 'groups',
      render: (groups: string[]) => groups.map((g) => <Tag key={g}>{g}</Tag>),
    },
    { title: 'Last Active', dataIndex: 'lastActive', key: 'lastActive', sorter: (a: User, b: User) => a.lastActive.localeCompare(b.lastActive) },
    {
      title: 'Actions', key: 'actions',
      render: (_: unknown, record: User) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setEditing(record); setModalOpen(true); }} />
          <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle={`${users.length} users`}
        actions={
          <Space>
            <Button icon={<UploadOutlined />} onClick={() => navigate('/users/import')}>Bulk Import</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(undefined); setModalOpen(true); }}>
              Create User
            </Button>
          </Space>
        }
      />
      <DataTable<User>
        data={filtered}
        columns={columns}
        rowKey="id"
        searchFields={['name', 'email']}
        searchPlaceholder="Search users..."
        filters={
          <Space>
            <Select
              placeholder="Role"
              allowClear
              style={{ width: 140 }}
              onChange={setRoleFilter}
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'Instructor', label: 'Instructor' },
                { value: 'Learner', label: 'Learner' },
              ]}
            />
            <Select
              placeholder="Status"
              allowClear
              style={{ width: 130 }}
              onChange={setStatusFilter}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
          </Space>
        }
      />
      <UserForm
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(undefined); }}
        onSubmit={handleSubmit}
        initialValues={editing}
      />
    </div>
  );
}
