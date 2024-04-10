import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import "antd/dist/reset.css";
import creatAccountImage from "../images/createaccount.jpg";
import WithdrawAmountImage from "../images/withdraw.png";
import depositImage from "../images/deposite.jpg";
import checkbalanceImage from "../images/check balance.jpg";

interface CardContainerProps {
  to: string;
  image: string; 
  title: string;
}

const AccountOperations = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#efdecd",
        minHeight: "100vh",
      }}
    >
      <h2>Account Operations</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* <CardContainer
          to="/create-account"
          image={creatAccountImage}
          title="Create Account"
        /> */}
        <CardContainer
          to="/withdraw"
          image={WithdrawAmountImage}
          title="Withdraw"
        />
        <CardContainer to="/deposit" image={depositImage} title="Deposit" />
        <CardContainer
          to="/delete-account"
          image={checkbalanceImage}
          title="Delete Account"
        />
      </div>
    </div>
  );
};

const CardContainer: React.FC<CardContainerProps> = ({ to, image, title }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Card
        style={{
          width: 300,
          marginBottom: 20,
          transition: "box-shadow 0.3s",
        }}
        hoverable
        cover={<img alt={title} src={image} style={{ width: "100%" }} />}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
          e.currentTarget.style.border = "1px solid #1890ff"; 
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "none"; 
          e.currentTarget.style.border = "1px solid transparent"; 
        }}
      >
        <h3>{title}</h3>
      </Card>
    </Link>
  );
};

export default AccountOperations;
