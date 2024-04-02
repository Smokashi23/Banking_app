import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { User } from "../interfaces";
import { useUpdateUserMutation } from "../hooks/useGetUserList";

const UpdateUser = ({ user,handleCancel }: { user: any,handleCancel:Function }) => {
  const [form] = Form.useForm();
  console.log({user});
  
  const [update_user,{isError,isLoading,isSuccess}]= useUpdateUserMutation()
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        address: user.address,
        email: user.email,
        mobile: user.mobile
      });
    }
  }, [user, form]);

  useEffect(()=>{
    if(isError){
      console.log("erro occured");
      handleCancel()
    }
    if(isLoading){
      console.log("loading...");
    }
    if(isSuccess){
      console.log("success...");
      handleCancel()
    }
  },[isError,isLoading,isSuccess])
  const handleUpdate = (values: User) => {
    // Perform update logic here
    console.log('Updated user:', {...values,password:user.password});
    update_user({...values, password: user.password, role: user.role.charAt(0).toUpperCase() + user.role.slice(1),user_id:user.user_id});

  };

  return (
    <div style={{ backgroundColor: '#efdecd', padding: '20px' }}>
      <Form
        form={form}
        onFinish={(values: any) => handleUpdate(values)}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Mobile No" name="mobile">
          <Input />
        </Form.Item>
        
        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUser;
