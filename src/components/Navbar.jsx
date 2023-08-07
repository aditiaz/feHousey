import Logo from '../assets/Logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import * as Components from './index';
import { useContext } from 'react';
import { RoomsContext } from '../context/roomsContext';
import { useNavigate } from 'react-router-dom';

export const Navbars = () => {
  const { modalSignUp, setModalSignUp, modalSignIn, setModalSignIn } = useContext(RoomsContext);
  const roles = localStorage.Roles;

  const navigate = useNavigate();

  return (
    <>
      <Navbar className="d-flex justify-content-between  fixed-top top-0 px-5 " bg="white">
        <Navbar.Brand href="#home">
          <img
            onClick={() => {
              navigate('/');
            }}
            style={{ width: '200px' }}
            src={Logo}
            alt="logo"
          />
        </Navbar.Brand>

        {roles == 'Owner' ? (
          <>
            <Components.DropdownOwner />
          </>
        ) : roles == 'Tenant' ? (
          <>
            <Components.DropdownNav />
          </>
        ) : (
          <div className="d-flex justify-content-around gap-5">
            <Components.SignIn
              className="d-flex justify-content-center"
              show={modalSignIn}
              onHide={() => setModalSignIn(false)}
            />
            <Button
              onClick={() => setModalSignIn(true)}
              // disabled
              className="text-secondary fw-bold"
              style={{ backgroundColor: 'rgba(255, 255, 255, 1)', border: 'none' }}
            >
              Sign In
            </Button>

            <Components.SignUp
              className="d-flex justify-content-center"
              show={modalSignUp}
              onHide={() => setModalSignUp(false)}
            />
            <Button
              // disabled
              onClick={() => setModalSignUp(true)}
              className="text-secondary fw-bold"
              style={{ backgroundColor: 'rgba(255, 255, 255, 1)', border: 'none' }}
            >
              Sign up
            </Button>
          </div>
        )}
      </Navbar>
    </>
  );
};
