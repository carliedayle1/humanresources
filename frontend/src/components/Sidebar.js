import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Accordion,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Col md={2} className='bg-light pr-0'>
      <Container className='d-flex flex-column align-items-center mt-3'>
        <Image
          src={userInfo.profilePicture}
          roundedCircle
          height={80}
          width={80}
          className='bg-dark '
        />
        <h5 className='p-2'>{userInfo.name}</h5>
      </Container>
      <Row>
        <Col xs={12}>
          <Container className='p-3'>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant='Card.Header'
                    eventKey='1'
                    className='text-dark'
                  >
                    Account
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='1'>
                  <ListGroup className='border-0 rounded-0'>
                    <ListGroup.Item>
                      <Link to='/profile'>Profile</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to='/documents'>Documents</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Collapse>
              </Card>

              {userInfo.isAdmin && (
                <Card>
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      variant='Card.Header'
                      eventKey='2'
                      className='text-dark'
                    >
                      Users
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='2'>
                    <ListGroup className='border-0 rounded-0'>
                      <ListGroup.Item>
                        <Link to='/users'>List all users</Link>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Link to='/admin/user/register'>Create new user</Link>
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Collapse>
                </Card>
              )}
            </Accordion>
          </Container>
        </Col>
      </Row>
    </Col>
  );
};

export default Sidebar;
