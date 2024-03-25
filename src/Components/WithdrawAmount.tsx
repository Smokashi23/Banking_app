import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Typography } from 'antd';
import { useAppDispatch } from '../hooks';
import { withdrawAmount } from '../redux/accountSlice';
import storage from '../utils/storage';

const { Title } = Typography;

const WithdrawAmount: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);

  const handleWithdraw = async (values: { accNo: string; amount: string }) => {
    const { accNo, amount } = values;
    setLoading(true);
    try {
      const response = await axios.put(
        'http://localhost:1925/account/withdrawal',
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
      dispatch(withdrawAmount());
      message.success('Withdrawal successful.');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          message.error(error.response.data.error_description || 'Insufficient balance.');
        } else {
          message.error('Error withdrawing amount.');
        }
      } else {
        message.error('Error withdrawing amount.');
      }
      console.error('Error withdrawing amount:', error);
      // Reset current balance to null on error
      setCurrentBalance(null);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <Title level={2}>Withdraw Amount</Title>
      <Form onFinish={handleWithdraw} layout="vertical">
        <Form.Item name="accNo" label="Account Number" rules={[{ required: true, message: 'Please enter account number' }]}>
          <Input type="number" placeholder="Account Number" />
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please enter amount' }]}>
          <Input type="number" placeholder="Amount" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Withdraw</Button>
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

export default WithdrawAmount;
