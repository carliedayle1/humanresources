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
import UserDocumentScreen from "./screens/UserDocumentScreen";
import LeaveCreditsScreen from "./screens/LeaveCreditsScreen";
import EvaluationScreen from "./screens/EvaluationScreen";
import CreateEvaluatorScreen from "./screens/CreateEvaluatorScreen";
import EvaluatorListScreen from "./screens/EvaluatorListScreen";
import LeaveCreditHistoryScreen from "./screens/LeaveCreditHistoryScreen";
import EvaluationHistoryScreen from "./screens/EvaluationHistoryScreen";
import EmployeeProfileScreen from "./screens/EmployeeProfileScreen";
import EvaluationRatingsHistoryScreen from "./screens/EvaluationRatingsHistoryScreen";

// import SampleScreen from "./screens/SampleScreen";

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
                  path='/admin/employees/register'
                  component={RegisterScreen}
                  exact
                />
                <Route path='/employees' component={UserListScreen} exact />
                <Route
                  path='/employees/:id'
                  component={EmployeeProfileScreen}
                  exact
                />
                <Route path='/users/:id/edit' component={UserEditScreen} />
                <Route path='/profile' component={UserProfileScreen} />
                <Route path='/documents' component={UserDocumentScreen} />

                <Route
                  path='/leavecredits'
                  component={LeaveCreditsScreen}
                  exact
                />
                <Route
                  path='/leavecredits/history'
                  component={LeaveCreditHistoryScreen}
                  exact
                />

                <Route path='/evaluation' component={EvaluationScreen} exact />
                <Route
                  path='/evaluator/create'
                  component={CreateEvaluatorScreen}
                  exact
                />
                <Route path='/evaluator/list' component={EvaluatorListScreen} />
                <Route
                  path='/evaluation/history'
                  component={EvaluationHistoryScreen}
                  exact
                />

                <Route
                  path='/evaluation/ratings/history'
                  component={EvaluationRatingsHistoryScreen}
                  exact
                />

                {/* <Route path='/sample' component={SampleScreen} exact /> */}
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
