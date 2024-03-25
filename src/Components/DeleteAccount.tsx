import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../hooks';
import { deleteAccount } from '../redux/accountSlice';
import storage from '../utils/storage';

const { confirm } = Modal;

const DeleteAccount = () => {
  const dispatch = useAppDispatch();
  const [accNo, setAccNo] = useState<number>(0);
  const [form] = Form.useForm();

  const handleAccNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccNo(parseInt(e.target.value));
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this account?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        handleSubmit();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.delete(`http://localhost:1925/account/delete?acc_no=${accNo}`, {
        headers: {
          Authorization: storage.getToken()
        },
      });
      // dispatch(deleteAccount(accNo));
      message.success('Account deleted successfully');
      form.resetFields();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data.error_description) {
        message.error(error.response.data.error_description);
      } else {
        message.error('Error deleting account. Please try again later.');
      }
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Delete Account</h2>
      <Form form={form} onFinish={showDeleteConfirm}>
        <Form.Item name="accNo" rules={[{ required: true, message: 'Please enter account number' }]}>
          <Input
            type="number"
            placeholder="Account Number"
            onChange={handleAccNoChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" danger>
            Delete Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DeleteAccount;
