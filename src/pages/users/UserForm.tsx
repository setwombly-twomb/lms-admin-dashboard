import { Modal, Form, Input, Select } from 'antd';
import type { User } from '../../types';
import { mockGroups } from '../../data/groups';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<User>) => void;
  initialValues?: Partial<User>;
}

export default function UserForm({ open, onClose, onSubmit, initialValues }: UserFormProps) {
  const [form] = Form.useForm();
  const isEdit = !!initialValues?.id;

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title={isEdit ? 'Edit User' : 'Create User'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText={isEdit ? 'Update' : 'Create'}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select options={[
            { value: 'Admin', label: 'Admin' },
            { value: 'Instructor', label: 'Instructor' },
            { value: 'Learner', label: 'Learner' },
          ]} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select options={[
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
          ]} />
        </Form.Item>
        <Form.Item name="groups" label="Groups">
          <Select
            mode="multiple"
            options={mockGroups.map((g) => ({ value: g.name, label: g.name }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
