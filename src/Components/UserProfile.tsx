import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { RootState } from "../redux/store";
import { Spin, Card } from "antd";
import storage from "../utils/storage";

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const { isLoading } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    // Fetch user information when component mounts
    const fetchUserProfile = async () => {
      try {
        const token = storage.getToken();
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        if (token) {
          headers.Authorization = token;
        }
        const response = await fetch("http://localhost:1925/get_user", {
          headers,
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    

    fetchUserProfile();
  }, []);

  return (
    <div style={{ backgroundColor: "#efdecd", padding: "20px" }}>
      {isLoading ? (
        <Spin size="large" />
      ) : user ? (
        <Card
          title="User Profile"
          bordered={false}
          style={{ border: "2px solid #444", marginBottom: "16px" }}
          headStyle={{ borderBottom: "2px solid #444" }}
        >
          <p>
            <strong>Username:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          {/* Add more user information fields as needed */}
        </Card>
      ) : (
        <div>No user information available</div>
      )}
    </div>
  );
};

export default UserProfile;
