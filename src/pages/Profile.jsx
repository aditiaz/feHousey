import React, { useState, useRef } from "react";
import { Button, Card, CardGroup, ListGroup, Container, Modal, Form } from "react-bootstrap";
import { Navbars } from "../components";
import email from "../assets/emailIc.svg";
import lock from "../assets/lockIc.svg";
import tenants from "../assets/tenantIc.svg";
import gender from "../assets/genderIc.svg";
import phone from "../assets/phoneIc.svg";
import address from "../assets/addressIc.svg";
import profile from "../assets/profile.jpg";
import { API } from "../lib/_api";
import { useQuery } from "react-query";
import jwt from "jwt-decode";
import { useMutation } from "react-query";

export function Profile(props) {
  const hiddenFileInput = useRef(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  console.log(password);

  const handlePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubPass = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Insert product data

      const response = await API.patch("/changepassword", password);
      console.log("berhasil ubah password", response.data);

      if (password.new_password != password.confirm_password) {
        return alert("password baru dan konfirmasi tidak sesuai");
      }

      alert("successfuly change password!");
    } catch (error) {
      console.log(error);
    }
  });

  let { data: tenant } = useQuery("profileCache", async () => {
    const responsuser = await API.get(`/user/` + decode.id);
    return responsuser.data.data;
  });

  const handleLocal = () => {
    setShow(true);
  };
  const [form, setForm] = useState({
    image: "",
  });
  const [preview, setPreview] = useState(null);
  const getToken = localStorage.getItem("token");
  const decode = jwt(getToken);
  // Create image url for preview
  const handleChangeImg = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmitImg = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0]);

      // Insert product data
      const response = await API.patch("/updateuser", formData);
      console.log(response.data);

      alert("successfully change your image!");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Navbars />
      <CardGroup style={{ marginBlock: "10rem" }}>
        <Container
          className="shadow row row-cols-2 mx-auto"
          style={{
            boxShadow: "0px 0px 4px rgba(5, 5, 5, 0.08)",
            marginTop: "3rem",
            width: "58rem",
            minHeight: "10rem",
            borderRadius: "1x",
            borderWidth: "3px",
            borderColor: "#FFFFFF",
            backgroundColor: "white",
          }}
        >
          <div>
            <Card.Header className="fw-bold fs-3 " style={{ marginBottom: "1rem" }}>
              Personal Info
            </Card.Header>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img src={require("../assets/profileIc.svg")} alt="" style={{ marginTop: "1rem" }} />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.fullname}</div>Full Name
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={email}
                alt=""
                style={{
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto mt-1">
                <div className="fw-bold">{tenant?.email}</div> Email
              </div>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="me-auto">
              <img
                src={lock}
                alt=""
                style={{
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <Button onClick={handleShow} variant="password " className="fw-bold color text-info ">
                Change Password
              </Button>
              <div className="ms-5 mb-3"></div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={tenants}
                alt=""
                style={{
                  marginBottom: "1rem",
                  width: "30px",
                  height: "34px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.listAs}</div>
                Status
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={gender}
                alt=""
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.gender}</div> Gender
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={phone}
                alt=""
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.phone}</div> Mobile Phone{" "}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={address}
                alt=""
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.address}</div>
                Address
              </div>
            </ListGroup.Item>
          </div>
          <div>
            <Card
              className="col-md-2 offset-6 mt-3"
              variant="primary"
              style={{ width: "220px", border: "none" }}
            >
              <form>
                <Card.Img
                  src={form.image == "" ? tenant.image : form.image}
                  style={{ width: "220px", height: "300px" }}
                />
                <input type="file" id="upload" name="image" hidden onChange={handleChangeImg} />
                <label
                  style={{ cursor: "pointer" }}
                  for="upload"
                  className="label-file-add-product"
                ></label>
                <Button onClick={(e) => handleSubmitImg.mutate(e)} type="submit">
                  Save
                </Button>
              </form>

              <input
                onChange={(e) => {
                  setForm(URL.createObjectURL(e.target.files[0]));
                  handleChangeImg();
                }}
                id="input-pic"
                type="file"
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
            </Card>
          </div>
        </Container>
        <Modal
          centered
          show={show}
          onHide={handleClose}
          className="d-flex justifycontent-center w-100"
        >
          <Modal.Header
            className="d-flex align-middle  justify-content-center"
            style={{ border: "none" }}
          >
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => handleSubPass.mutate(e)}>
              <Form.Group className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
                <Form.Label htmlFor="old_password" style={{ fontWeight: "bold" }}>
                  Old Password
                </Form.Label>
                <Form.Control
                  onChange={handlePassword}
                  id="old_password"
                  name="old_password"
                  type="password"
                  value={password.old_password}
                  rows={1}
                />
              </Form.Group>
              <Form.Group className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
                <Form.Label htmlFor="new_password" style={{ fontWeight: "bold" }}>
                  New Password
                </Form.Label>
                <Form.Control
                  onChange={handlePassword}
                  id="new_password"
                  name="new_password"
                  type="password"
                  value={password.new_password}
                  rows={1}
                />
              </Form.Group>
              <Form.Group className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
                <Form.Label htmlFor="confirm_password" style={{ fontWeight: "bold" }}>
                  Confirm Password
                </Form.Label>

                <Form.Control
                  onChange={handlePassword}
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  value={password.confirm_password}
                  rows={1}
                />
              </Form.Group>
              <Modal.Footer
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  style={{ backgroundColor: "#5A57AB", width: "200px", border: "none" }}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </CardGroup>
    </>
  );
}
