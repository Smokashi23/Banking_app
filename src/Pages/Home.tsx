import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import backgroundImage from "../images/Bank.png";


const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;

const ContentWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LogoImage = styled.img`
  max-width: 150px;
  margin-bottom: 1rem;
`;

const Home = () => {
  return (
    <HomeContainer>
      <ContentWrapper>
        <div className="alert alert-warning" role="alert">
          Be aware of fraud! Never share your personal information or bank
          details.
        </div>
        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            {/* <LogoImage src={bankImage} alt="Bank Logo" /> */}
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Welcome to BOS Banking System</h2>
                <p className="card-text">
                  Secure and Reliable Banking Services
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
          </div>
        </div>
        <div className="row justify-content-center">
          <Link to="/login" className="btn btn-primary mr-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
