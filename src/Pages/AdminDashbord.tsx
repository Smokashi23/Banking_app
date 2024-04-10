import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useGetUserListQuery } from "../hooks/useGetUserList"; 

const { Header, Content, Sider } = Layout;

const Admin: React.FC = () => {
  const { data: userList, error, isLoading } = useGetUserListQuery();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Link to="/admin/userlist">
              <span>User List</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/updateuser">
              <span>Update User</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
            <Routes>
              {/* <Route path="/admin/userlist"> */}
                {/* Render the user list data fetched using the useGetUserListQuery hook */}
                {/* {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <ul>
                    {userList?.map((user) => (
                      <li key={user.id}>{user.name}</li>
                    ))}
                  </ul>
                )} */}
              {/* </Route> */}
              {/* Define other routes here */}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
