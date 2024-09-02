import styled from 'styled-components';
import Calendar from 'react-calendar';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: -35px;
`;

export const StyledHeader = styled.h1`
  text-align: center;
  margin-bottom: 5px; 
  font-size: 1.3rem;
`;

export const StyledSubHeader = styled.h1`
  text-align: center;
  margin-bottom: 20px; 
  font-size: 0.7rem;
`;

export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .react-calendar {
    width: 350px; 
    height: 350px;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    padding: 2%;
    background-color: white;
    display: flex;
    flex-direction: column;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    margin-bottom: 20px;
    position: relative;
  }

  .react-calendar__navigation__label {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 800;
    font-size: 1.2rem;
  }

  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1.2rem;
    background: none;
  }

  .react-calendar__month-view__weekdays {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-bottom: 10px;
  }

  .react-calendar__month-view__weekdays__weekday {
    flex: 1;
    display: flex;
    justify-content: center;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none; 
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 0;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.2s ease-in-out;
    transform: scale(0.9);
  }

  .react-calendar__tile--active {
    background-color: black;
    color: white;
  }

  .react-calendar__tile--range {
    background-color: lightgray;
    color: white;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background-color: black;
    color: white;
  }

  .react-calendar__tile--disabled {
    color: #ccc;
    pointer-events: none; 
  }
`;

export const StyledCalendar = styled(Calendar)`
`;

export const StyledButtonWrapper = styled.div`
  margin-top: 20px; 
  display: flex;
  justify-content: center;
`;

export const StyledButton1 = styled.button`
  width: 80px;
  margin-right: 10px;
  background-color: lightgray;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: black;
  }
`;

export const StyledButton2 = styled.button`
  width: 260px;
  background-color: lightgray;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: black;
  }
`;
