
import { Container, Row, Col, Button ,Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

function completeprofile() {
  
  
  return (
    <>
    <Navbar>
    <Container>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1>Welcome to Expense Tracker!!!</h1>
          <p>Your profile is incomplete. Complete now</p>
          <Link to="/profile-completion">
            <Button variant="primary">Complete now</Button>
          </Link>
        </Col>
      </Row>
    </Container>
    </Navbar>
    <hr style={{ margin: '0' }}/>
</>

 
  );
}

export default completeprofile;