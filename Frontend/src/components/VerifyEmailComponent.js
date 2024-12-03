import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../utils/UserPool';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

const VerifyEmailComponent = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const email = location.state?.email || '';
  const password = location.state?.password || '';
  const { authenticate, setStatus } = useAuth();

  useEffect(() => {
    if (!email || !password) {
      setMessage("No user found. Please sign up or log in.");
      toast.error("No user found. Please sign up or log in.");
    }
  }, [email, password]);

  const resendOTP = () => {
    if (!email) {
      setMessage("Email is missing. Please sign up again.");
      toast.error("Email is missing. Please sign up again.");
      return;
    }

    setMessage("Sending OTP...");
    const cognitoUser = new CognitoUser({ Username: email, Pool: UserPool });
    
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error(err);
        setMessage("Failed to resend OTP. Please try again.");
        toast.error("Failed to resend OTP. Please try again.");
      } else {
        console.log(result);
        setMessage("OTP has been resent to your email.");
        toast.success("OTP has been resent to your email.");
      }
    });
  };

  const verifyOTP = async () => {
    if (!email || !otp) {
      setMessage("Email or OTP is missing. Please try again.");
      toast.error("Email or OTP is missing. Please try again.");
      return;
    }

    setMessage("Verifying OTP...");
    const cognitoUser = new CognitoUser({ Username: email, Pool: UserPool });
    
    try {
      await new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(otp, true, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      await authenticate(email, password);
      setStatus(true);
      setMessage("Email Verified. You are now logged in.");
      toast.success("Email Verified. You are now logged in.");
      navigate('/securityquestions', { state: { email, password } });
      
    } catch (err) {
      console.error(err);
      setMessage("Invalid OTP. Please try again.");
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <Container
      fluid
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://via.placeholder.com/1920x1080)', // Replace with your desired background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col md={6} lg={4} className="text-center">
          <Card className="shadow-lg border-0 rounded-lg" style={{ backgroundColor: 'transparent' }}>
            <Card.Header className="bg-warning text-white text-center py-3">
              <h2>Verify Your Email</h2>
            </Card.Header>
            <Card.Body className="p-4 bg-light rounded">
              {message && <Alert variant={message.includes("Failed") || message.includes("Invalid") ? "danger" : "success"}>{message}</Alert>}
              
              <p>Please enter the OTP sent to your email to verify your account.</p>
              <Form.Group className="mb-3">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              
              <div className="d-grid gap-3">
                <Button variant="warning" size="lg" onClick={resendOTP} className="shadow-sm">
                  Resend OTP
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={verifyOTP}
                  className="shadow-sm"
                >
                  Verify OTP
                </Button>
              </div>
            </Card.Body>
            <Card.Footer className="text-center py-3 bg-light">
              <span>
                If you need further assistance, please contact support.
              </span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyEmailComponent;