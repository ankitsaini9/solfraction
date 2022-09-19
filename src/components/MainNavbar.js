import { useState } from "react";
import { Link } from "react-router-dom";
import "./MainNavbar.css";
import logo from "../images/logo.png";
import Knob from "../images/knob.svg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch } from "react-redux";
import { setPubKey } from "../store/nftSlice";

const MainNavbar = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const dispatch = useDispatch();

  const connectWallet = async () => {
    const provider = await window.solana;
    console.log(provider);
    if (provider) {
      await window.solana.connect();
      window.solana.on("connect", () => {
        console.log("connect");
      });
      console.log("before", provider.publicKey);
      setWalletConnected(true);
      dispatch(setPubKey(provider.publicKey));
    } else window.open("https://phantom.app/", "_blank");
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img
              alt=""
              src={logo}
              height="50"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="/explore">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/collections">
              Collections
            </Nav.Link>
            <NavDropdown title="Community">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="More">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <NavDropdown
            className="knob-btn"
            title={
              <Button className="ms-2" variant="outline-success">
                <img alt="" src={Knob}></img>
              </Button>
            }
          >
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
          {walletConnected ? (
            <Button
              as={Link}
              to="/fractionalize"
              className="ms-2"
              variant="success"
            >
              Fractionalize
            </Button>
          ) : (
            <Button onClick={connectWallet} className="ms-2" variant="success">
              Connect wallet
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
