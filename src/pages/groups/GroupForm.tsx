import { Modal, Form, Input } from 'antd';
import type { Group } from '../../types';

interface GroupFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<Group>) => void;
  initialValues?: Partial<Group>;
}

export default function GroupForm({ open, onClose, onSubmit, initialValues }: GroupFormProps) {
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
      title={isEdit ? 'Edit Group' : 'Create Group'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText={isEdit ? 'Update' : 'Create'}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item name="name" label="Group Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
