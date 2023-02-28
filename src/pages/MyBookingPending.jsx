import { Table, Container, Row, Col } from "react-bootstrap";
import React from "react";
import { Navbars } from "../components";
import dotOutLine from "../assets/dotOutLine.svg";
import dotFill from "../assets/dotFill.svg";
import lineBooking from "../assets/lineBooking.svg";
import Logo from "../assets/Logo.svg";
import Qr from "../assets/qr.svg";
import { API } from "../lib/_api";
import { useQuery } from "react-query";
import jwt from "jwt-decode";

export const MyBookingPending = () => {
  const getToken = localStorage.getItem("token");
  const decode = jwt(getToken);

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (
    <>
      <Navbars />
      <Container style={{ marginTop: "6rem" }}>
        {transactions?.map((e, i) => {
          let period = (Date.parse(e.check_out) - Date.parse(e.check_in)) / 86400000;
          if (e.user_id === decode.id && e.status == "success") {
            return (
              <Row style={{ marginBlock: ".5rem" }}>
                <div
                  style={{
                    marginTop: 30,
                    boxShadow: "0px 0px 1px",
                    borderRadius: 10,
                    padding: "0px 30px 0px 30px",
                  }}
                >
                  <div className="d-flex" style={{ justifyContent: "space-between" }}>
                    <div className="p-4">
                      <img src={Logo} width={110} alt="" />
                    </div>
                    <div
                      className="mx-3"
                      style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
                    >
                      <h2 className="p-3 text-center fw-bold">Invoice</h2>
                      <h3>{e.check_in}</h3>
                    </div>
                  </div>
                  <div className="d-flex" style={{ justifyContent: "space-between" }}>
                    <div>
                      <h3 className="md-5">{e.property.name_property}</h3>
                      <Col md={8}>
                        <p>
                          {e.property.address},{e.property.city}
                        </p>
                        <div
                          className={` d-flex justify-content-center   bg-success`}
                          style={{ width: "7rem", height: "2rem", borderRadius: "10px" }}
                        >
                          <p className={`text-black `} style={{ fontSize: "1.2rem" }}>
                            {e.status}
                          </p>
                        </div>
                      </Col>
                      <img src="/img/prove.svg" alt="" />
                    </div>
                    <div style={{ marginRight: -80, marginTop: 10 }}>
                      <img src="/img/prove.svg" alt="" />
                    </div>
                    <div>
                      <Col st md={15}>
                        <div className="d-flex gap-3">
                          <div className="d-grid gap-1 " style={{ marginTop: "-2rem" }}>
                            <img
                              className="d-flex justify-content-center"
                              style={{
                                width: "2rem",
                                height: "2rem",
                                color: "black",
                              }}
                              src={dotOutLine}
                              alt="dot"
                            />

                            <img
                              className="bg-primary"
                              src={lineBooking}
                              alt="line"
                              style={{ marginInline: ".8rem", height: "7rem" }}
                            />
                            <img
                              className="d-flex justify-content-center"
                              style={{
                                width: "2rem",
                                height: "2rem",
                                color: "black",
                              }}
                              src={dotFill}
                              alt="dot"
                            />
                          </div>
                          <div>
                            <h5>Check-In</h5>
                            <p>{e.check_in}</p>
                            <h5>Check-Out</h5>
                            <p>{e.check_out}</p>
                          </div>
                        </div>
                      </Col>
                    </div>
                    <div>
                      <div>
                        <h5>Amenities</h5>
                        <p style={{ color: "grey" }}>
                          {e.property.amenities.map((amenity, k) => (
                            <span
                              key={k}
                              style={{
                                padding: "4px",
                                width: "5.5rem",
                                backgroundColor: "white",
                                top: "35px",
                                left: "20px",
                                marginLeft: "5px",
                                borderRadius: "5px",
                                color: "grey",
                              }}
                              variant="primary"
                            >
                              {amenity}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div>
                        <h5>Type of Rent</h5>
                        <p style={{ color: "grey" }}>{e.property.type_of_rent}</p>
                      </div>
                    </div>
                    <div>
                      <div
                        className="d-flex border border-4 border-dark"
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={Qr} alt="" style={{ width: 150, height: "auto" }} />
                      </div>
                      <h7 className="text-secondary text-center d-flex w-100 justify-content-center">
                        TCK0101
                      </h7>
                    </div>
                  </div>
                  <Table>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td style={{ color: "grey" }}>{e.user.fullname}</td>
                        <td style={{ color: "grey" }}>{e.user.gender}</td>
                        <td style={{ color: "grey" }}>{e.user.phone}</td>
                        <td style={{ fontWeight: "bold" }}>Long Time rent</td>
                        <td>:</td>
                        <td style={{ fontWeight: "bold" }}>
                          {period} {period > 1 ? "Days" : "Day"}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5} style={{ fontWeight: "bold" }}>
                          Total
                        </td>
                        <td>:</td>
                        <td style={{ fontWeight: "bold", color: "green" }}>
                          Rp.{e.price.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Row>
            );
          } else {
            return (
              <div style={{ marginTop: "25rem", display: "flex", justifyContent: "center" }}>
                <h1>You haven't booked yet</h1>
              </div>
            );
          }
        })}
      </Container>
    </>
  );
};

export default MyBookingPending;
