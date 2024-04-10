import React, { useState } from "react";
import { useGetUserListQuery } from "../hooks/useGetUserList";
import { Spin, Card, Row, Col, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import UpdateUser from "./Updateuser";
import CreateAccount from "./CreateAccount";

const UserList = () => {
  const { data: userList, error, isLoading } = useGetUserListQuery();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleEdit = (userId: any) => {
    showModal();
  };

  return (
    <div style={{ backgroundColor: "#efdecd", padding: "20px" }}>
      {isLoading ? (
        <Spin size="large" />
      ) : error ? (
        <div>Error: An error occurred</div>
      ) : (
        <Row gutter={[16, 16]}>
          {userList?.map((user) => (
            <Col key={user.user_id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={user.name}
                bordered={false}
                style={{ border: "2px solid #444", marginBottom: "16px" }}
                headStyle={{ borderBottom: "2px solid #444" }}
              >
                <p>
                  <strong>User ID:</strong> {user.user_id}
                </p>
                <p>
                  <strong>Address:</strong> {user.address}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Mobile No:</strong> {user.mobile}
                </p>
                <Button
                  type="primary"
                  onClick={() => {
                    handleEdit(user.user_id);
                    setUserInfo(user);
                    setEditMode(true);
                    setCreateMode(false)
                  }}
                >
                  Edit
                </Button>

                <Button type="primary"
                onClick={()=>{
                  setUserInfo(user);
                  showModal()
                  setEditMode(false);
                  setCreateMode(true)
                }}
                >+ Account</Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal
        title="update user"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        {editMode && <UpdateUser user={userInfo} handleCancel={handleCancel} />}
        {createMode && <CreateAccount user={userInfo} handleCancel={handleCancel}/>}
        
      </Modal>
    </div>
  );
};

export { UserList };
