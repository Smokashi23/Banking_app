import React, { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createAccount } from "../redux/accountSlice";
import { Account } from "../interfaces";
import { RootState } from "../redux/store";
import { log } from "console";
import storage from "../utils/storage";

const CreateAccount = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(
    (state: RootState) => state.account
  );

  const [formData, setFormData] = useState<Account>({
    branch_id: 1001,
    acc_type: "",
    balance: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value, typeof e.target.value);
    let { name, value } = e.target;
    let updatedFormData;
    if (name === "branch_id" || name === "balance") {
      updatedFormData = +value;
    }
    setFormData({
      ...formData,
      [e.target.name]: updatedFormData ? updatedFormData : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1925/account/create",
        formData,
        {
          headers: {
            Authorization: storage.getToken(),
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(createAccount());
      console.log("Account created successfully:", response.data);
      setFormData({
        branch_id: 1001,
        acc_type: "",
        balance: 0,
      });
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <select
          name="branch_id"
          value={formData.branch_id}
          onChange={handleChange}
        >
          <option value={1001}>1001</option>
          <option value={1002}>1002</option>
        </select>
        <input
          type="text"
          name="acc_type"
          placeholder="Account Type"
          value={formData.acc_type}
          onChange={handleChange}
        />
        <input
          type="number"
          name="balance"
          placeholder="Initial Balance"
          value={formData.balance}
          onChange={handleChange}
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
