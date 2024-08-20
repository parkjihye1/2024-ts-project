import React from 'react';
import styled from 'styled-components';
import Logo from '../images/Logo.svg';

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.img`

@media (min-width: 480px) {
    width: 30%;
}

@media (min-width: 600px) {
    width: 20%;
}

@media (min-width: 1024px) {
    width: 15%;
}

@media (min-width: 1280px) {
    width: 10%;
}
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <StyledLogo src={Logo} alt="Logo" />
    </StyledHeader>
  );
}

export default Header;
