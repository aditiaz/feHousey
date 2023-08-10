import React from 'react';
import * as Components from '../components';
import { Row } from 'react-bootstrap';
import IndexOwner from './IndexOwner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <Components.Navbars />
      <Row>
        <Components.SideBar />
        <Components.RoomsCard />
      </Row>
    </>
  );
};
