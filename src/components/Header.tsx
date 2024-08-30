import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../images/TRAKPACK.svg';

const StyledHeader = styled.div`
  display: flex;
  margin-top: -35px;
  margin-left: -40px;

  @media (max-width: 600px) {
    margin-top: -30px;
    margin-left: -35px;
  }
`;

const StyledLogo = styled.img`
  width: 250px;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 200px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;

  &:nth-child(1) {
    color: darkgray;
  }

  &:nth-child(2) {
    color: black
  }
`;

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      navigate('/', {
        replace: true,
        state: {
          selectedLocation: null,
          startDate: null,
          endDate: null,
        },
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);

    navigate('/', {
      replace: true,
      state: {
        selectedLocation: null,
        startDate: null,
        endDate: null,
      },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledHeader>
      <StyledLogo src={Logo} alt="Logo" onClick={handleLogoClick} />
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>변경사항이 저장되지 않을 수 있습니다.</ModalText>
            <ButtonContainer>
              <ModalButton onClick={handleCancel}>취소</ModalButton>
              <ModalButton onClick={handleConfirm}>확인</ModalButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </StyledHeader>
  );
};

export default Header;
