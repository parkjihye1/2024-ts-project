import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: -225px;
`;

export const StyledHeader = styled.div`
  text-align: center;
  margin-bottom: 15px; 
  font-size: 1.3rem;
`;

export const StyledInputWrapper = styled.div`
  position: relative;
  width: 300px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 13px;
  border-radius: 10px;
  border: solid 1px lightgray;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-flex;
  align-items: center;
  outline: none;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid lightgray;
  margin: 0;
  padding: 0;
  list-style-type: none;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: none; 
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgray; 
    border-radius: 10px;
    border: 2px solid darkgray; 
  }
`;

export const DropdownItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const CityName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const CountryName = styled.div`
  font-size: 12px;
  color: gray;
`;
