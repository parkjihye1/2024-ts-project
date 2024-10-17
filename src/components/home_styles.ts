import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 70px;     
`;

export const CitySelectionButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  margin-bottom: 20px;
  color: black;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }
`;

export const SelectionWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const SelectedCityText = styled.h2`
  font-size: 18px;
  color: gray;
  margin-bottom: 80px;
`;

export const DateNavigationButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  color: black;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }
`;

export const DateInfoWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const DateText = styled.p`
  font-size: 18px;
  color: gray;
  margin-bottom: 80px;
`;

export const PlanButton = styled.button`
  padding: 10px 20px;
  width: 200px;
  font-size: 0.9rem;
  background-color: lightgray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: black;
  }
`;
