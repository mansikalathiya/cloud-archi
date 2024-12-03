import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

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
              <h2>Welcome to Weather App</h2>
            </Card.Header>
            <Card.Body className="p-4 bg-light rounded">
              <h1 className="mb-4 text-dark">Get Started</h1>
              <div className="d-grid gap-3">
                <Button 
                  variant="warning" 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="shadow-sm"
                >
                  Login
                </Button>
                <Button 
                  variant="outline-warning" 
                  size="lg" 
                  onClick={() => navigate('/signup')}
                  className="shadow-sm"
                >
                  Sign Up
                </Button>
              </div>
            </Card.Body>
            <Card.Footer className="text-center py-3 bg-light">
              <span className="text-muted small">
                Manage your weather forecasts easily.
              </span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;