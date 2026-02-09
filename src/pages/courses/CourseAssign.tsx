import { useState } from 'react';
import { Transfer, Select, Card, message } from 'antd';
import type { TransferProps } from 'antd';
import PageHeader from '../../components/common/PageHeader';
import { mockUsers } from '../../data/users';
import { mockGroups } from '../../data/groups';
import { mockCourses } from '../../data/courses';

type RecordType = { key: string; title: string; description: string };

const userRecords: RecordType[] = mockUsers.map((u) => ({
  key: u.id,
  title: u.name,
  description: u.email,
}));

const groupRecords: RecordType[] = mockGroups.map((g) => ({
  key: g.id,
  title: g.name,
  description: `${g.memberCount} members`,
}));

export default function CourseAssign() {
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const [assignType, setAssignType] = useState<'users' | 'groups'>('users');
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const dataSource = assignType === 'users' ? userRecords : groupRecords;

  const handleChange: TransferProps['onChange'] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys.map(String));
    message.success(`Assigned ${newTargetKeys.length} ${assignType}`);
  };

  return (
    <div>
      <PageHeader title="Assign Course" subtitle="Assign users or groups to a course" />
      <Card>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <Select
            placeholder="Select a course"
            style={{ width: 260 }}
            onChange={setSelectedCourse}
            options={mockCourses.map((c) => ({ value: c.id, label: c.name }))}
          />
          <Select
            value={assignType}
            onChange={(v) => { setAssignType(v); setTargetKeys([]); }}
            options={[
              { value: 'users', label: 'Users' },
              { value: 'groups', label: 'Groups' },
            ]}
            style={{ width: 140 }}
          />
        </div>
        {selectedCourse && (
          <Transfer
            dataSource={dataSource}
            targetKeys={targetKeys}
            onChange={handleChange}
            render={(item) => item.title}
            titles={['Available', 'Assigned']}
            listStyle={{ width: 300, height: 400 }}
            showSearch
          />
        )}
      </Card>
    </div>
  );
}
