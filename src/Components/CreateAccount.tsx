import React, { useReducer, useState } from "react";
import { Form, Input, Button, Select, Card, Divider, message } from "antd";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createAccount } from "../redux/accountSlice";
import { RootState } from "../redux/store";
import storage from "../utils/storage";

const { Option } = Select;

const initialState = {
  branch_id: 1001,
  acc_type: "savings",
  balance: 0,
};

const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};

const CreateAccount = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootState) => state.account);

  const [formData, dispatchFormData] = useReducer(reducer, initialState);
  const [createdResponse, setCreatedResponse] = useState<any>(null);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleChange = (name: string, value: string | number) => {
    dispatchFormData({ [name]: value });
  };

  const handleSubmit = async () => {
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
      setCreatedResponse(response.data);
      dispatchFormData(initialState);
      setSuccessVisible(true);
      message.success("Account created successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.error_description) {
          message.error(error.response.data.error_description);
        } else {
          message.error("Error creating account.");
        }
      } else {
        message.error("Error creating account.");
      }
      console.error("Error creating account:", error);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      {error && <p>{error}</p>}
      <Form onFinish={handleSubmit}>
        <Form.Item label="Branch ID">
          <Select
            value={formData.branch_id}
            onChange={(value) => handleChange("branch_id", value)}
          >
            <Option value={1001}>1001</Option>
            <Option value={1002}>1002</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Account Type" name="acc_type">
          <Select
            value={formData.acc_type}
            onChange={(value) => handleChange("acc_type", value)}
          >
            <Option value="savings">Savings</Option>
            <Option value="current">Current</Option>
            <Option value="loan">Loan</Option>
            <Option value="salary">Salary</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Initial Balance"
          name="balance"
          rules={[
            { required: true, message: "Please enter initial balance" },
            {
              type: "number",
              min: 0, 
              transform: (value) => parseFloat(value), 
              message: "Initial balance must be a non-negative number",
            },
          ]}
        >
          <Input
            type="number"
            value={formData.balance}
            onChange={(e) =>
              handleChange("balance", parseFloat(e.target.value))
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Account
          </Button>
        </Form.Item>
      </Form>
      {successVisible && createdResponse && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Account Created Successfully</h3>
          <Divider />
          <p>
            <strong>Account No:</strong> {createdResponse.acc_no}
          </p>
          <p>
            <strong>Branch ID:</strong> {createdResponse.branch_id}
          </p>
          <p>
            <strong>Balance:</strong> {createdResponse.balance}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateAccount;
