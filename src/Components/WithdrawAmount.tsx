import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../hooks';
import { withdrawAmount } from '../redux/accountSlice';
import storage from '../utils/storage';

const WithdrawAmount  = () => {
  const dispatch = useAppDispatch();
  const [accNo, setAccNo] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [balance, setBalance] = useState<number | null>(null);

  const handleAccNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccNo(e.target.value); 
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:1925/account/withdrawal', {
        acc_no: parseInt(accNo),
        amount: parseFloat(amount),
      }, {
        headers: {
          Authorization: storage.getToken(),
          "Content-Type": "application/json",
        },
      });
  
      const updatedBalance = response.data.balance;
      setBalance(updatedBalance); 
     
      dispatch(withdrawAmount());
      console.log('Withdrawal successful. Updated balance:', updatedBalance);
    } catch (error) {
      console.error('Error withdrawing amount:', error);
    }
  };

  return (
    <div>
      <h2>Withdraw Amount</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Account Number"
          value={accNo}
          onChange={handleAccNoChange}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <button type="submit">Withdraw</button>
      </form>
      {balance !== null && <p>Current Balance: {balance}</p>}
    </div>
  );
};

export default WithdrawAmount;
