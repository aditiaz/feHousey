import { RoomsContext } from "../context/roomsContext";
import React, { useContext } from "react";
import { Navbars } from "../components";
import { Row, Container, Table } from "react-bootstrap";
import magnifiyIc from "../assets/magnifiyIc.svg";
import { API } from "../lib/_api";
import { useQuery } from "react-query";

export const IndexOwner = () => {
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  const { users } = useContext(RoomsContext);
  const changeColor = (status) => {
    return status === "Approve" ? "success" : status === "Pending" ? "warning" : "danger";
  };
  //   console.log(users);
  return (
    <Container>
      <Navbars />;
      <Row style={{ marginTop: "15rem" }}>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Users</th>
              <th>Type of Rent</th>

              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((e, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.user.fullname}</td>
                  <td>{e.property.type_of_rent}</td>
                  <td>{e.check_in}</td>
                  <td>{e.check_out}</td>
                  <td className={`text-${changeColor(e.status)}`}>{e.status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default IndexOwner;
