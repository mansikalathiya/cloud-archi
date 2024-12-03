import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await forgotPassword(email);
      setSuccess('Password reset code has been sent to your email');
      toast.success('Password reset code has been sent to your email');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
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
              <h2>Forgot Password</h2>
            </Card.Header>
            <Card.Body className="p-4 bg-light rounded">
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
                <div className="d-grid gap-3">
                  <Button 
                    type="submit" 
                    variant="warning" 
                    size="lg" 
                    disabled={loading}
                    className="shadow-sm"
                  >
                    {loading ? 'Sending...' : 'Reset Password'}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="lg" 
                    onClick={() => navigate('/login')}
                    className="shadow-sm"
                  >
                    Back to Login
                  </Button>
                </div>
              </Form>
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

export default ForgotPasswordComponent;