import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../hooks';
import { deleteAccount } from '../redux/accountSlice';
import storage from '../utils/storage'; // Assuming storage utility for handling tokens

const DeleteAccount = () => {
  const dispatch = useAppDispatch();
  const [accNo, setAccNo] = useState<number>(0);

  const handleAccNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccNo(parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:1925/account/delete?acc_no=${accNo}`, {
        headers: {
          Authorization: storage.getToken()
        },
      });
      // dispatch(deleteAccount(accNo));
      console.log('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Account Number"
          value={accNo}
          onChange={handleAccNoChange}
        />
        <button type="submit">Delete Account</button>
      </form>
    </div>
  );
};

export default DeleteAccount;
