import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  StyledContainer, 
  StyledHeader,
  StyledSubHeader,  
  StyledCalendarWrapper,
  StyledCalendar,
  StyledButtonWrapper, 
  StyledButton1,
  StyledButton2,     
} from './date_styles';

type Value = Date | [Date, Date];

interface DateSelectorProps {
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ setStartDate, setEndDate }) => {
  const today = new Date();
  const [tempDateRange, setTempDateRange] = useState<Value>([today, today]);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedLocation = location.state?.selectedLocation; 

  const handleDateChange = (value: Date | [Date, Date]) => {
    if (Array.isArray(value)) {
      setTempDateRange(value);
    } else {
      setTempDateRange([value, value]);
    }
  };

  const handleConfirm = () => {
    if (Array.isArray(tempDateRange) && tempDateRange[0] && tempDateRange[1]) {
      setStartDate(tempDateRange[0]);
      setEndDate(tempDateRange[1]);
      navigate('/', { 
        state: { 
          selectedLocation: selectedLocation, 
          startDate: tempDateRange[0], 
          endDate: tempDateRange[1] 
        } 
      });
    }
  };

  const handleReset = () => {
    const resetDate: [Date, Date] = [today, today];
    setTempDateRange(resetDate);
  };

  return (
    <StyledContainer> 
      <StyledHeader>여행하실 날짜는 언제부터 언제까지인가요?</StyledHeader>
      <StyledSubHeader>현지 여행 기간(여행지 도착 날짜, 여행지 출발 날짜)으로 입력해 주세요. </StyledSubHeader>
      <StyledCalendarWrapper>
        <StyledCalendar
          selectRange
          value={tempDateRange}
          onChange={(value) => handleDateChange(value as Date | [Date, Date])}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          tileDisabled={({ date, view }) => {
            if (view === 'month') {
              return moment(date).isBefore(moment(today), 'day');
            } else if (view === 'year') {
              return moment(date).isBefore(moment(today), 'month');
            }
            return false;
          }}
          tileClassName={({ date, view }) => {
            if (view === 'month' && moment(date).isBefore(moment(today), 'day')) {
              return 'react-calendar__tile--disabled';
            } else if (view === 'year' && moment(date).isBefore(moment(today), 'month')) {
              return 'react-calendar__tile--disabled';
            }
            return undefined;
          }}
        />
      </StyledCalendarWrapper>
      <StyledButtonWrapper>
        <StyledButton1 onClick={handleReset}>초기화</StyledButton1>
        <StyledButton2 onClick={handleConfirm}>선택</StyledButton2>
      </StyledButtonWrapper>
    </StyledContainer> 
  );
};

export default DateSelector;
