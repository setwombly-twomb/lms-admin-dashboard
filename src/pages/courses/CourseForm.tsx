import { Drawer, Form, Input, Select, Button, Space } from 'antd';
import type { Course } from '../../types';

interface CourseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<Course>) => void;
  initialValues?: Partial<Course>;
}

export default function CourseForm({ open, onClose, onSubmit, initialValues }: CourseFormProps) {
  const [form] = Form.useForm();
  const isEdit = !!initialValues?.id;

  const handleFinish = (values: Partial<Course>) => {
    onSubmit(values);
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={isEdit ? 'Edit Course' : 'Create Course'}
      open={open}
      onClose={onClose}
      width={480}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <Form.Item name="name" label="Course Title" rules={[{ required: true, message: 'Please enter a course title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select options={[
            { value: 'Development', label: 'Development' },
            { value: 'Design', label: 'Design' },
            { value: 'Data', label: 'Data' },
            { value: 'Management', label: 'Management' },
            { value: 'Security', label: 'Security' },
            { value: 'Communication', label: 'Communication' },
          ]} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select options={[
            { value: 'Published', label: 'Published' },
            { value: 'Draft', label: 'Draft' },
          ]} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
