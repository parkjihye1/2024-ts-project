import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
`;

export const ModalContent = styled.div`
  h3 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const DateButtonList = styled.ul`
  margin-left: 10px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start; /* 왼쪽 정렬 */
`;

export const DateButtonItem = styled.li`
  flex: 0 1 calc(20% - 10px);
  display: flex;
  justify-content: center;
`;

export const DateButton = styled.button<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? '#ccc' : '#e0e0e0')}; /* 선택된 날짜 배경색 */
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: lightgray;
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: space-between;
  gap: 100px;
`;

export const ModalButton = styled.button`
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
