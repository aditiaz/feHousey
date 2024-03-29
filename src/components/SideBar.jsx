import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useContext } from 'react';
import { RoomsContext } from '../context/roomsContext';
import { API } from '../lib/_api';
import { useMutation } from 'react-query';

export const SideBar = () => {
  const [buttons, setButtons] = useState('1');
  const [button, setButton] = useState('1');
  const [btnTime, setBtnTime] = useState('month');

  const [durationVal, setDuration] = useState('');
  const [bedVal, setBed] = useState('');
  const [bathVal, setBath] = useState('');
  const [amenitiesVal, setAmenities] = useState([]);
  const [budgetVal, setBudget] = useState(9000000);
  const { setFiltered } = useContext(RoomsContext);
  const handleSubmit = useMutation(async e => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Insert data for login process
      const response = await API.get(
        '/multifilter?type_rent=' +
          durationVal +
          '&price=' +
          budgetVal +
          '&bedroom=' +
          bedVal +
          '&bathroom=' +
          bathVal +
          '&amenities=["' +
          amenitiesVal.join('","') +
          '"]',
        config,
      );

      // Checking process
      if (response.data.data != null) {
        setFiltered(response.data.data);

        console.log('filter', response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <Col className="col-3  fixed-top " style={{ marginTop: '7.5rem', height: '40rem' }}>
      <Col className="mx-5 ">
        <Form>
          <h4>Type of Rent</h4>
          <Col className="d-flex justify-content-between mt-3">
            <Button
              style={{
                fontSize: '1.3rem',
                backgroundColor: 'rgba(196, 196, 196, 0.25)',
                border: 'none',
                color: 'black',
                fontWeight: 'bold',
              }}
              className={btnTime === 'day' ? 'py-2 w-25 click' : 'py-2 w-25 noClick'}
              onClick={() => {
                setBtnTime('day');
                setDuration('Day');
              }}
              // onClick={filterPeriod("Day")}
            >
              Day
            </Button>
            <Button
              style={{
                backgroundColor: 'rgba(196, 196, 196, 0.25)',
                fontSize: '1.2rem',
                color: 'black',
                fontWeight: 'bold',
                border: 'none',
              }}
              className={btnTime === 'month' ? 'py-2 w-25 click' : 'py-2 w-25 noClick'}
              onClick={() => {
                setBtnTime('month');
                setDuration('Month');
              }}
              size="md"
            >
              Month
            </Button>
            <Button
              style={{
                fontSize: '1.7rem',
                border: 'none',
                backgroundColor: 'rgba(90, 87, 171, 1)',
              }}
              className={btnTime === 'year' ? 'py-2 w-25 click' : 'py-2 w-25 noClick'}
              onClick={() => {
                setBtnTime('year');
                setDuration('Week');
              }}
              size="md"
            >
              Week
            </Button>
          </Col>
          {/* button end */}

          <h4 className="my-3">Property Room</h4>
          {/* BedRoom */}
          <h6 className="text-secondary my-3">Bed Room</h6>
          <Row className="d-flex justify-content-between">
            <Button
              className={'1' === buttons ? 'click' : 'noClick'}
              style={{
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                width: '3.5rem',
                height: '2.6rem',
              }}
              onClick={() => {
                setButtons('1');
                setBed('1');
              }}
            >
              1
            </Button>
            <Button
              className={'2' === buttons ? 'click' : 'noClick'}
              style={{
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                width: '3.5rem',
                height: '2.6rem',
                color: 'black',
                backgroundColor: 'rgba(196, 196, 196, 0.25)',
              }}
              onClick={() => {
                setButtons('2');
                setBed('2');
              }}
            >
              2
            </Button>
            <Button
              className={'3' === buttons ? 'click' : 'noClick'}
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                border: 'none',
                width: '3.5rem',
                height: '2.6rem',
                color: 'black',
                // backgroundColor: "rgba(196, 196, 196, 0.25)",
              }}
              onClick={() => {
                setButtons('3');
                setBed('3');
              }}
            >
              3
            </Button>
            <Button
              className={'4' === buttons ? 'click' : 'noClick'}
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                border: 'none',
                width: '3.5rem',
                height: '2.6rem',
                color: 'black',
                backgroundColor: 'rgba(196, 196, 196, 0.25)',
              }}
              onClick={() => {
                setButtons('4');
                setBed('4');
              }}
            >
              4
            </Button>
            <Button
              className={'5' === buttons ? 'click' : 'noClick'}
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                border: 'none',
                width: '3.5rem',
                height: '2.6rem',
                color: 'black',
                backgroundColor: 'rgba(196, 196, 196, 0.25)',
              }}
              onClick={() => {
                setButtons('5');
                setBed('5');
              }}
            >
              5+
            </Button>
          </Row>
          {/* BedRoom End*/}
          <h6 className="text-secondary my-3">Bath Room</h6>
          <Row className="d-flex justify-content-between">
            <Button
              className={'1' === button ? 'click' : 'noClick'}
              style={{
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'rgba(196, 196, 196, 0.25)',
                fontSize: '1.2rem',
                border: 'none',
                width: '3.5rem',
                height: '2.6rem',
              }}
              onClick={() => {
                setButton('1');
                setBath('1');
              }}
            >
              1
            </Button>
            <Button
              className={'2' === button ? 'click' : 'noClick'}
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                border: 'none',
                width: '3.5rem',
                height: '2.6rem',
                backgroundColor: 'rgba(90, 87, 171, 1)',
              }}
              onClick={() => {
                setButton('2');
                setBath('2');
              }}
            >
              2
            </Button>
            <Button
              className={'3' === button ? 'click' : 'noClick'}
              style={{
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'rgba(196, 196, 196, 0.25)',
                fontSize: '1.2rem',
                border: 'none',
                width: '3.5rem',
                height: '2.6rem',
              }}
              onClick={() => {
                setButton('3');
                setBath('3');
              }}
            >
              3
            </Button>
            <Button
              className={'4' === button ? 'click' : 'noClick'}
              style={{
                color: 'black',
                fontWeight: 'bold',
                backgroundColor: 'rgba(196, 196, 196, 0.25)',
                fontSize: '1.2rem',
                border: 'none',
                width: '3.5rem',
                height: '2.6rem',
              }}
              onClick={() => {
                setButton('4');
                setBath('4');
              }}
            >
              4
            </Button>
            <Button
              className={'5' === button ? 'click' : 'noClick'}
              style={{
                color: 'black',
                fontWeight: 'bold',
                backgroundColor: 'rgba(196, 196, 196, 0.25)',
                fontSize: '1.2rem',
                border: 'none',
                width: '3.5rem',
                height: '2.6rem',
              }}
              onClick={() => {
                setButton('5');
                setBath('5');
              }}
            >
              5+
            </Button>
          </Row>
          {/* Bath Room end */}
          {/* Amneties */}
          <h4 className="my-3">Amenities</h4>
          <Row className="row-cols-1">
            <Col className="d-flex justify-content-between ">
              <h7 className="text-secondary ">Furnished</h7>
              <Form.Check
                size="lg"
                value="Furnished"
                checked={amenitiesVal.includes('Furnished')}
                onChange={e => {
                  if (e.target.checked) {
                    setAmenities(prevState => [...prevState, e.target.value]);
                  } else {
                    setAmenities(prevState => prevState.filter(a => a !== e.target.value));
                  }
                }}
              />
            </Col>
            <Col className="d-flex justify-content-between ">
              <h7 className="text-secondary ">Pet Allowed</h7>
              <Form.Check
                size="lg"
                value="Pet Allowed"
                checked={amenitiesVal.includes('Pet Allowed')}
                onChange={e => {
                  if (e.target.checked) {
                    setAmenities(prevState => [...prevState, e.target.value]);
                  } else {
                    setAmenities(prevState => prevState.filter(a => a !== e.target.value));
                  }
                }}
              />
            </Col>
            <Col className="d-flex justify-content-between ">
              <h7 className="text-secondary ">Shared Accomodation</h7>
              <Form.Check
                size="lg"
                value="Shared Accomodation"
                checked={amenitiesVal.includes('Shared Accomodation')}
                onChange={e => {
                  if (e.target.checked) {
                    setAmenities(prevState => [...prevState, e.target.value]);
                  } else {
                    setAmenities(prevState => prevState.filter(a => a !== e.target.value));
                  }
                }}
              />
            </Col>
          </Row>
          {/* Amneties End */}
          <h5 className="my-1">Budget</h5>

          <Row>
            <Col>
              <Form.Group as={Row} className=" d-flex " controlId="formHorizontalEmail">
                <Form.Label column sm={5}>
                  <h6>Less than IDR.</h6>
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    size="md"
                    type="number"
                    name="price"
                    placeholder="Choose Price"
                    value={budgetVal}
                    onChange={e => setBudget(e.target.value)}
                    className="bg-light"
                  />
                </Col>
                <Col className="d-flex justify-content-end mt-3">
                  <Button
                    className="px-5"
                    size="lg"
                    style={{
                      fontSize: '1.3rem',
                      backgroundColor: 'rgba(90, 87, 171, 1)',
                      border: 'none',
                    }}
                    onClick={e => handleSubmit.mutate(e)}
                  >
                    Apply
                  </Button>
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Col>
    </Col>
  );
};
