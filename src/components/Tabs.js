import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

export const Tabs = () => {
  const location = useLocation();

  const links = [
    {
      to: "/",
      text: "Swap",
    },
    {
      to: "/deposit",
      text: "Deposit",
    },
    {
      to: "/withdraw",
      text: "Withdraw",
    },
    {
      to: "/charts",
      text: "Charts",
    },
  ];

  const linkPills = links.map((link, idx) => {
    return (
      <LinkContainer
        key={idx}
        to={link.to}
       className="purple fw-bold"
        style={
          location.pathname === link.to
            ? { backgroundColor: "#D8BFD8", color: 'purple', border: "solid 2px purple", borderRadius: '10px'}
            : { backgroundColor: "transparent" }
        }
      >
        <Nav.Link>{link.text}</Nav.Link>
      </LinkContainer>
    );
  });

  return (
    <Nav
      variant="pills"
      defaultActiveKey="/"
      className="justify-content-center my-4"
    >
      {linkPills}
    </Nav>
  );
};

export default Tabs;
