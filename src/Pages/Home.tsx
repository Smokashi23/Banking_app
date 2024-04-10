import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../images/Bank.png';
import bankLogo from '../images/download.png';
import '../Stylesheet/Home.css';

const HomeContainer = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage});
`;

const ContentWrapper = styled.div``;

const LogoImage = styled.img``;

const Heading = styled.h1``;

const Subheading = styled.p``;

const ButtonGroup = styled.div``;

const StyledLink = styled(Link)``;

const Home: React.FC = () => {
  return (
    <HomeContainer className="home-container">
      <ContentWrapper className="content-wrapper">
        <LogoImage src={bankLogo} alt="Bank Logo" className="logo-image" />
        <Heading className="heading">Welcome to SBM Banking</Heading>
        <Subheading className="subheading">Secure and reliable banking services for all your financial needs.</Subheading>
        <ButtonGroup className="button-group">
          <Link to="/login" className="styled-link login-button">Login</Link>
          <Link to="/signup" className="styled-link signup-button">Sign Up</Link>
        </ButtonGroup>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
