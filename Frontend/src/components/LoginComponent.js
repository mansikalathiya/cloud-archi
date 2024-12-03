import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../utils/UserPool';
import { getUser } from '../apis/Authapi';

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (data) => {
        try {
          const userData = await getUser(email);
          console.log('User data:', userData);
          localStorage.setItem('userEmail', email);
          navigate('/weather');
        } catch (error) {
          setError('Error retrieving user data');
          console.error('Error:', error);
        }
      },
      onFailure: (err) => {
        setError(err.message || 'Error logging in');
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
              <h2>Login</h2>
            </Card.Header>
            <Card.Body className="p-4 bg-light rounded">
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>
                <div className="d-grid gap-3">
                  <Button type="submit" variant="warning" size="lg" className="shadow-sm">
                    Login
                  </Button>
                </div>
                <div className="text-center mt-3">
                  <a href="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center py-3 bg-light">
              <span>
                New user? <a href="/signup" className="text-decoration-none">Sign Up</a>
              </span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;