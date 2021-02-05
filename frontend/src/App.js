import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

//NEW VIEWS

import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import ProfileView from "./views/ProfileView";
import CreateAdmin from "./views/superAdmin/CreateAdmin";
import EmployeeList from "./views/employees/EmployeeList";
import EmployeeCreate from "./views/employees/EmployeeCreate";
import EmployeeProfile from "./views/employees/EmployeeProfile";
import CreateLeaveCredit from "./views/leaveCredits/CreateLeaveCredit";
import LeaveCreditHistory from "./views/leaveCredits/LeaveCreditHistory";
import CreateEvaluator from "./views/evaluation/CreateEvaluator";
import EvaluatorList from "./views/evaluation/EvaluatorList";
import CreateEvaluation from "./views/evaluation/CreateEvaluation";
import EvaluationHistory from "./views/evaluation/EvaluationHistory";
import EvaluationRatingsHistory from "./views/evaluation/EvaluationRatingsHistory";
import Rating from "./views/evaluation/Rating";

const App = () => {
  return (
    <Router>
      <Header />
      <main className='h-100 mw-100'>
        <Container>
          <Switch>
            <Route path='/' component={HomeView} exact />
            <Route path='/login' component={LoginView} exact />
            <Route path='/profile' component={ProfileView} exact />

            <Route path='/admin/create' component={CreateAdmin} exact />
            <Route path='/employees' component={EmployeeList} exact />
            <Route path='/employees/create' component={EmployeeCreate} exact />
            <Route path='/employees/:id' component={EmployeeProfile} exact />
            <Route
              path='/leavecredits/create'
              component={CreateLeaveCredit}
              exact
            />
            <Route path='/leavecredits' component={LeaveCreditHistory} exact />
            <Route
              path='/evaluators/create'
              component={CreateEvaluator}
              exact
            />
            <Route path='/evaluators' component={EvaluatorList} exact />
            <Route
              path='/evaluations/create'
              component={CreateEvaluation}
              exact
            />
            <Route
              path='/evaluations/history'
              component={EvaluationHistory}
              exact
            />
            <Route
              path='/evaluations/ratings'
              component={EvaluationRatingsHistory}
              exact
            />
            <Route path='/rating' component={Rating} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );

  // return (
  //   <Router>
  //     <div>
  //       <Header />
  //       <main>
  //         <Row>
  //           {userInfo && <Sidebar />}

  //           <Col md={userInfo ? 10 : 12}>
  //             <Container className={userInfo ? "py-3 " : "py-3 mt-4"}>
  //               <Route path='/' component={HomeScreen} exact />
  //               <Route path='/login' component={LoginScreen} />
  //               <Route
  //                 path='/admin/employees/register'
  //                 component={RegisterScreen}
  //                 exact
  //               />
  //               <Route path='/employees' component={UserListScreen} exact />
  //               <Route
  //                 path='/employees/:id'
  //                 component={EmployeeProfileScreen}
  //                 exact
  //               />
  //               <Route path='/users/:id/edit' component={UserEditScreen} />
  //               <Route path='/profile' component={UserProfileScreen} />
  //               <Route path='/documents' component={UserDocumentScreen} />

  //               <Route
  //                 path='/leavecredits'
  //                 component={LeaveCreditsScreen}
  //                 exact
  //               />
  //               <Route
  //                 path='/leavecredits/history'
  //                 component={LeaveCreditHistoryScreen}
  //                 exact
  //               />

  //               <Route path='/evaluation' component={EvaluationScreen} exact />
  //               <Route
  //                 path='/evaluator/create'
  //                 component={CreateEvaluatorScreen}
  //                 exact
  //               />
  //               <Route path='/evaluator/list' component={EvaluatorListScreen} />
  //               <Route
  //                 path='/evaluation/history'
  //                 component={EvaluationHistoryScreen}
  //                 exact
  //               />

  //               <Route
  //                 path='/evaluation/ratings/history'
  //                 component={EvaluationRatingsHistoryScreen}
  //                 exact
  //               />

  //               {/* <Route path='/sample' component={SampleScreen} exact /> */}
  //             </Container>
  //           </Col>
  //         </Row>
  //       </main>
  //       <Footer />
  //     </div>
  //   </Router>
  // );
};

export default App;
