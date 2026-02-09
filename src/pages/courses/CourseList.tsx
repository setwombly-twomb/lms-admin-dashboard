import { useState } from 'react';
import { Button, Tag, Select, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import CourseForm from './CourseForm';
import { mockCourses } from '../../data/courses';
import type { Course } from '../../types';

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Course | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const navigate = useNavigate();

  const filtered = courses.filter((c) => {
    if (statusFilter && c.status !== statusFilter) return false;
    if (categoryFilter && c.category !== categoryFilter) return false;
    return true;
  });

  const handleSubmit = (values: Partial<Course>) => {
    if (editing) {
      setCourses((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...values } : c)));
      message.success('Course updated');
    } else {
      const newCourse: Course = {
        id: String(Date.now()),
        name: values.name || '',
        description: values.description || '',
        category: values.category || 'Development',
        status: values.status || 'Draft',
        enrolledUsers: 0,
        createdDate: new Date().toISOString().split('T')[0],
      };
      setCourses((prev) => [newCourse, ...prev]);
      message.success('Course created');
    }
    setEditing(undefined);
  };

  const handleDelete = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    message.success('Course deleted');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: Course, b: Course) => a.name.localeCompare(b.name) },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s: string) => <Tag color={s === 'Published' ? 'green' : 'orange'}>{s}</Tag>,
    },
    { title: 'Enrolled', dataIndex: 'enrolledUsers', key: 'enrolledUsers', sorter: (a: Course, b: Course) => a.enrolledUsers - b.enrolledUsers },
    { title: 'Created', dataIndex: 'createdDate', key: 'createdDate', sorter: (a: Course, b: Course) => a.createdDate.localeCompare(b.createdDate) },
    {
      title: 'Actions', key: 'actions',
      render: (_: unknown, record: Course) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setEditing(record); setDrawerOpen(true); }} />
          <Popconfirm title="Delete this course?" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button size="small" icon={<UsergroupAddOutlined />} onClick={() => navigate('/courses/assign')} />
        </Space>
      ),
    },
  ];

  const categories = [...new Set(courses.map((c) => c.category))];

  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle={`${courses.length} courses`}
        actions={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(undefined); setDrawerOpen(true); }}>
            Create Course
          </Button>
        }
      />
      <DataTable<Course>
        data={filtered}
        columns={columns}
        rowKey="id"
        searchFields={['name', 'category']}
        searchPlaceholder="Search courses..."
        filters={
          <Space>
            <Select
              placeholder="Status"
              allowClear
              style={{ width: 130 }}
              onChange={setStatusFilter}
              options={[
                { value: 'Published', label: 'Published' },
                { value: 'Draft', label: 'Draft' },
              ]}
            />
            <Select
              placeholder="Category"
              allowClear
              style={{ width: 160 }}
              onChange={setCategoryFilter}
              options={categories.map((c) => ({ value: c, label: c }))}
            />
          </Space>
        }
      />
      <CourseForm
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setEditing(undefined); }}
        onSubmit={handleSubmit}
        initialValues={editing}
      />
    </div>
  );
}
