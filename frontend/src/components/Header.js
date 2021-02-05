import React from "react";
import Admin from "./auth/Admin";
import SignOut from "./auth/SignOut";
import Evaluator from "./auth/Evaluator";
import SuperAdmin from "./auth/SuperAdmin";
import SignIn from "./auth/SignIn";
import Notifications from "../components/Notifications";

import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <header>
      <Navbar bg='dark' variant='dark' fixed='top'>
        <Container className='d-flex justify-content-between'>
          <div>
            <Navbar.Brand href='/'>Personnel Information System</Navbar.Brand>
          </div>
          <div>
            <Nav className='mr-auto '>
              {userInfo && userInfo.isSuperAdmin && <SuperAdmin />}
              {userInfo && userInfo.isAdmin && <Admin />}
              {userInfo && userInfo.isEvaluator && <Evaluator />}
              {userInfo && <Notifications id={userInfo._id} />}
              {userInfo ? <SignIn /> : <SignOut />}

              {/* <SignIn />
              <SignOut /> */}
            </Nav>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import { logout } from "../actions/userActions";

// const Header = () => {
//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const logoutHandler = () => {
//     dispatch(logout());
//   };

//   return (
//     <header>
//       <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary collapseOnSelect'>
//         <Container>
//           <LinkContainer to='/'>
//             <Navbar.Brand>Personnel Information System</Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls='basic-navbar-nav' />
//           <Navbar.Collapse id='basic-navbar-nav'>
//             <Nav className='ml-auto'>
//               {userInfo ? (
//                 <>
//                   <NavDropdown title={userInfo.name} id='username'>
//                     <LinkContainer to='/profile'>
//                       <NavDropdown.Item>Profile</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item onClick={logoutHandler}>
//                       Logout
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </>
//               ) : (
//                 <LinkContainer to='/login'>
//                   <Nav.Link className='btn btn-secondary my-2 my-sm-0 text-white'>
//                     <i className='fas fa-user mr-2'></i>
//                     Sign In
//                   </Nav.Link>
//                 </LinkContainer>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;
