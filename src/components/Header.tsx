import React from 'react';
import styled from 'styled-components';
import Logo from '../images/Logo.svg';

const StyledHeader = styled.div`
  display: flex;
  margin-top: 1.5vh;
  margin-left: 1.5vh;
`;

const StyledLogo = styled.img`
  width: 15vw;

  max-width: 150px;
  min-width: 100px;

  @media (min-width: 480px) {
    width: 14vw;
  }

  @media (min-width: 600px) {
    width: 12vw;
  }

  @media (min-width: 1024px) {
    width: 10vw;
  }

  @media (min-width: 1280px) {
    width: 8vw;
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