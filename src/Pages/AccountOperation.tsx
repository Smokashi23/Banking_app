
import React from 'react';
import { Link } from 'react-router-dom';

const AccountOperations = () => {
  return (
    <div>
      <h2>Account Operations</h2>
      <ul>
        <li>
          <Link to="/create-account">Create Account</Link>
        </li>
        <li>
          <Link to="/withdraw">Withdraw</Link>
        </li>
        <li>
          <Link to="/deposit">Deposit</Link>
        </li>
        <li>
          <Link to="/delete-account">Delete Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default AccountOperations;
