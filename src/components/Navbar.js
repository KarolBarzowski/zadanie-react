import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const StyledNavbar = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background-color: white;
  padding: 16px;
`;

const StyledLink = styled(NavLink)`
  color: rgb(0, 122, 255);
  text-decoration: none;
`;

function Navbar({ cartItems }) {
  return (
    <StyledNavbar>
      <StyledLink to="/">Strona główna</StyledLink>
      <StyledLink to="/koszyk">Koszyk ({cartItems})</StyledLink>
    </StyledNavbar>
  );
}

const mapStateToProps = ({ cartItems }) => ({ cartItems });

export default connect(mapStateToProps)(Navbar);
