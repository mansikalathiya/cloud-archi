import React from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../utils/UserPool';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

const OTPComponent = ({ email, password }) => {
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    // Confirm registration with OTP
    user.confirmRegistration(otp, true, (err) => {
      if (err) {
        console.error('OTP confirmation failed:', err);
        toast.error("Invalid OTP. Please try again.");
        return;
      }

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });

      // Authenticate user after OTP confirmation
      user.authenticateUser(authDetails, {
        onSuccess: () => {
          toast.success("OTP verified successfully");
          navigate('/');
        },
        onFailure: (err) => {
          console.error('Authentication failed:', err);
          toast.error("Authentication failed. Please check your credentials.");
        },
        newPasswordRequired: (data) => {
          console.log('New password required:', data);
        }
      });
    });
  };

  return (
    <Container fluid className="bg-light min-vh-50 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <h3 className="mb-0">OTP Verification</h3>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
             
              <Form.Control
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </Form.Group>
            <div className="d-grid gap-3">
              <Button type="submit" variant="warning" size="lg" className="shadow-sm">
                Submit
              </Button>
            </div>
          </Form>
          
        </Col>
      </Row>
    </Container>
  );
};

export default OTPComponent;