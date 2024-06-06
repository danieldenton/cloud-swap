import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

export const Tabs = () => {
  return (
    <Nav
      variant="pills"
      defaultActiveKey="/"
      className="justify-content=center my-4"
    >
      <LinkContainer to="/">
        <Nav.Link>Swap</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default Tabs;
