import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Typography } from 'antd';
import { useAppDispatch } from '../hooks';
import { depositAmount } from '../redux/accountSlice';
import storage from '../utils/storage';

const { Title } = Typography;

const DepositAmount = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);

  const handleDeposit = async (values: { accNo: string; amount: string }) => {
    const { accNo, amount } = values;
    setLoading(true);
    try {
      const response = await axios.put(
        'http://localhost:1925/account/deposit',
        {
          acc_no: parseInt(accNo),
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: storage.getToken(),
            'Content-Type': 'application/json',
          },
        }
      );
      const updatedBalance = response.data.balance;
      setCurrentBalance(updatedBalance);
      dispatch(depositAmount());
      message.success('Deposit successful.');
    } catch (error: any) {
      setCurrentBalance(null); // Reset current balance
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          message.error(error.response.data.error_description || 'Error depositing amount.');
        } else {
          message.error('Error depositing amount.');
        }
      } else {
        message.error('Error depositing amount.');
      }
      console.error('Error depositing amount:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <Title level={2}>Deposit Amount</Title>
      <Form onFinish={handleDeposit} layout="vertical">
        <Form.Item name="accNo" label="Account Number" rules={[{ required: true, message: 'Please enter account number' }]}>
          <Input type="number" placeholder="Account Number" />
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please enter amount' }]}>
          <Input type="number" placeholder="Amount" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Deposit</Button>
        </Form.Item>
      </Form>
      {currentBalance !== null && (
        <div style={{ marginTop: '20px', border: '1px solid #d9d9d9', padding: '10px', borderRadius: '5px' }}>
          <p style={{ margin: 0, fontSize: '18px' }}>Current Balance</p>
          <Title level={3} style={{ margin: 0 }}>{currentBalance}</Title>
        </div>
      )}
    </div>
  );
};

export default DepositAmount;
