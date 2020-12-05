import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      <div>
        <Header />
        <main>
          <Row>
            {userInfo && <Sidebar />}

            <Col md={userInfo ? 10 : 12}>
              <Container className={userInfo ? "py-3 " : "py-3 mt-4"}>
                <Route path='/' component={HomeScreen} exact />
                <Route path='/login' component={LoginScreen} />
                <Route
                  path='/admin/user/register'
                  component={RegisterScreen}
                  exact
                />
                <Route path='/users' component={UserListScreen} exact />
                <Route path='/users/:id/edit' component={UserEditScreen} />
                <Route path='/profile' component={UserProfileScreen} />
              </Container>
            </Col>
          </Row>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
