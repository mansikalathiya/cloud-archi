import React, { useState } from 'react';
import UserPool from '../utils/UserPool';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import toast from 'react-hot-toast';
import OTPComponent from './OTPComponent';
import { postUser } from '../apis/Authapi'; // Import the postUser function

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });
  const [otp, setOtp] = useState(false);

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email format is valid
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Proceed with sign-up if email is valid
    UserPool.signUp(formData.email, formData.password, [], [], (err, data) => {
      if (err) {
        console.error("Cognito Signup Error:", err);
        toast.error("Sign-up failed. Please try again.");
      } else {
        console.log("Cognito Signup Success:", data);
        toast.success("User created successfully");

        const userData = {
          name: formData.name,
          email: formData.email,
          role: 'User',
        };
        console.log("Attempting to save user data:", userData);
        postUser(userData)
          .then((response) => {
            console.log("PostUser API Response:", response);
            toast.success("User data saved successfully");
          })
          .catch((error) => {
            console.error("PostUser API Error:", error);
            toast.error("Failed to save user data");
          });

        setOtp(true);
      }
    });
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
              <h2>Weather App - Sign Up</h2>
            </Card.Header>
            <Card.Body className="p-4 bg-light rounded">
              {!otp ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter password"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmpassword"
                      value={formData.confirmpassword}
                      onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })}
                      placeholder="Confirm password"
                      required
                    />
                  </Form.Group>
                  <div className="d-grid gap-3">
                    <Button type="submit" variant="warning" size="lg" className="shadow-sm">
                      Sign Up
                    </Button>
                  </div>
                </Form>
              ) : (
                <OTPComponent email={formData.email} password={formData.password} name={formData.name} />
              )}
            </Card.Body>
            <Card.Footer className="text-center py-3 bg-light">
              <span>
                Already have an account? <a href="/login" className="text-decoration-none">Log In</a>
              </span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpComponent;