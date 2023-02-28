import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { API } from "../lib/_api";
import { useQuery } from "react-query";
import { RoomsContext } from "../context/roomsContext";
import { useNavigate } from "react-router-dom";

export const RoomsCard = () => {
  const { filtered } = useContext(RoomsContext);
  const navigate = useNavigate();

  let { data: properties } = useQuery("propertiesCache", async () => {
    const response = await API.get("/properties");
    return response.data.data;
  });

  const property = filtered ? filtered : properties;
  console.log(property);
  return (
    <Col size="lg" style={{ marginBlock: "1rem", marginInlineStart: "25rem" }}>
      <CardGroup
        className="gap-3 mx-3   d-flex justify-content-between"
        style={{ marginTop: "12rem" }}
      >
        {property && property.length > 0 ? (
          property.map((e, k) => {
            return (
              <Col xs={3} sm={3} style={{ width: "25rem" }}>
                <Card key={e.image}>
                  <div>
                    {e.amenities.map((amenity, k) => (
                      <span
                        key={k}
                        className="position-relative fw-bold "
                        style={{
                          padding: "4px",
                          width: "5.5rem",
                          backgroundColor: "white",
                          top: "35px",
                          left: "20px",
                          marginLeft: "5px",
                          borderRadius: "5px",
                        }}
                        variant="primary"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Card.Img
                    style={{ height: "30rem", cursor: "pointer", marginTop: "-30px" }}
                    onClick={() => navigate(`detail/${e.id}`)}
                    // variant="top"
                    src={e.image}
                  />
                  <Card.Body>
                    <Card.Title>
                      Rp.{e.price.toLocaleString()} / {e.type_of_rent}
                    </Card.Title>
                    <Card.Text>
                      <p className="fw-bold">
                        {e.bedroom} {e.bedroom > 1 ? "beds" : "bed"},{e.bathroom}{" "}
                        {e.bathroom > 1 ? "bathrooms" : "bathroom"},{e.sqf} sqft
                      </p>
                      <p className="text-secondary">
                        {e.city},{e.address}
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "2rem",
              marginInline: "auto",
            }}
          >
            <div>Sorry,we don't have property you're looking for</div>
          </div>
        )}
      </CardGroup>
    </Col>
  );
};
