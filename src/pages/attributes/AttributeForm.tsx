import { Modal, Form, Input, Select, Switch, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { Attribute } from '../../types';

interface AttributeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<Attribute>) => void;
  initialValues?: Partial<Attribute>;
}

export default function AttributeForm({ open, onClose, onSubmit, initialValues }: AttributeFormProps) {
  const [form] = Form.useForm();
  const isEdit = !!initialValues?.id;
  const attrType = Form.useWatch('type', form);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title={isEdit ? 'Edit Attribute' : 'Create Attribute'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText={isEdit ? 'Update' : 'Create'}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item name="name" label="Attribute Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select options={[
            { value: 'Text', label: 'Text' },
            { value: 'Number', label: 'Number' },
            { value: 'Date', label: 'Date' },
            { value: 'Select', label: 'Select (Dropdown)' },
          ]} />
        </Form.Item>
        <Form.Item name="appliedTo" label="Applied To" rules={[{ required: true }]}>
          <Select options={[
            { value: 'User', label: 'User' },
            { value: 'Course', label: 'Course' },
          ]} />
        </Form.Item>
        <Form.Item name="required" label="Required" valuePropName="checked">
          <Switch />
        </Form.Item>
        {attrType === 'Select' && (
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                <label style={{ display: 'block', marginBottom: 8 }}>Options</label>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={name} rules={[{ required: true, message: 'Enter option' }]} style={{ margin: 0 }}>
                      <Input placeholder="Option value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                  Add Option
                </Button>
              </>
            )}
          </Form.List>
        )}
      </Form>
    </Modal>
  );
}
